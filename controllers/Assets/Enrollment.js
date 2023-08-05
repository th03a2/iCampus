// entity/save
const Entity = require("../../models/Assets/Enrollments"),
  User = require("../../models/Assets/Persons/Users"),
  Sections = require("../../models/Assets/Sections");

exports.save = async (req, res) => {
  try {
    const { enrollee, guardians, currentSiblings, createSiblings, father } =
      req.body;

    const { information, hasChange } = guardians;
    const item = await Entity.create(enrollee);
    if (hasChange) {
      // para malaman kung nag palit ba siya ng guardian
      if (information.id?.length > 5) {
        //ito ay kapag ang napili niyang guardian ay naka registered na
        await User.findOneAndUpdate(
          { _id: enrollee.student },
          {
            guardian: {
              id: information.id,
              relationship: information.relationship,
            },
          }
        );
      } else {
        // pag hindi pa naka registered ang kaniyang guardian
        const { _id, ..._information } = information;

        const datas = await User.create({
          ..._information,
          password: "password",
          email: _information.mobile,
        });

        await User.findOneAndUpdate(
          { _id: enrollee.student },
          {
            guardian: {
              id: datas._id,
              relationship: _information.relationship,
            },
          }
        );
      }
    }

    const validCreateSiblings = createSiblings.filter((data) => data !== null);
    if (validCreateSiblings.length > 0) {
      // kung may bago ba siyang inadd na siblings na hindi naka registered
      const promises = validCreateSiblings.map((data) =>
        User.create({
          ...data,
          email: `${data.fullName?.fname}${data.fullName?.mname}${data.fullName?.lname}`,
          password: "password",
        }).then((siblings) => siblings._id)
      );
      const validCurrentSiblings = currentSiblings.filter(
        (sibling) => sibling !== null
      );

      const siblingsId = await Promise.all(promises);
      const updateSiblings = [...siblingsId, ...validCurrentSiblings];

      await User.findOneAndUpdate(
        { _id: enrollee.student },
        {
          siblings: updateSiblings,
        }
      );
    } else {
      //kapag ang inadd niya na siblings ay naka registered na
      await User.findOneAndUpdate(
        { _id: enrollee.student },
        {
          siblings: currentSiblings,
        }
      );
    }
    const { isCreate } = father;
    const { id } = father.information;
    if (isCreate && father.information.mobile) {
      //  kapag mag  reregister siya ng father
      if (id.length < 2) {
        const datas = await User.create({
          ...father.information,
          email: `${father.information.fullName?.fname}${father.information.fullName?.mname}${father.information.fullName?.lname}`,
          password: "password",
        });

        await User.findOneAndUpdate(
          { _id: enrollee.student },
          {
            fatherId: datas._id,
          }
        );
      } else {
        // ito ay para kapag ang pinili kapag ang pinili niya ay naka registered na
        await User.findOneAndUpdate(
          { _id: enrollee.student },
          {
            fatherId: father.information.id,
          }
        );
      }
    }
    // para iupdate ang siblings na attribute sa may enrollment na model
    const students = await User.find({ _id: enrollee.student }).catch(
      (error) => {
        console.error(error);
      }
    );

    await Entity.findByIdAndUpdate(
      { _id: item._id },
      { siblings: students[0].siblings }
    );

    res.json({ status: "Successfully enrolled" });
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

const getSiblings = async (fk) =>
  User.find({ _id: fk })
    .then((datas) => datas)
    .catch((error) => {
      console.log(error);
    });

const getGuardian = async (fk) =>
  User.find({ _id: fk })
    .then((datas) => datas[0])
    .catch((error) => {
      console.log(error);
    });

const getParents = async (fk) =>
  User.find({ _id: fk })
    .then((datas) => datas[0])
    .catch((error) => {
      console.log(error);
    });

exports.browse = (req, res) => {
  Entity.find({ status: req.query.status })
    .populate("batch")
    .populate("student")
    .then(async (batchs) => {
      const batchFilter = batchs.filter((item) => !item.deletedAt);
      if (batchFilter.length > 0 && batchFilter[0].student) {
        let siblings =
          batchFilter[0].siblings?.length > 0
            ? await Promise.all(
                batchFilter[0].siblings?.map(async (sibling) => {
                  var _siblings = await getSiblings(sibling);
                  return _siblings;
                })
              )
            : [];

        let guardian = await getGuardian(batchFilter[0].student?.guardian?.id);
        let mother = await getParents(batchFilter[0].student?.motherId);
        let father =
          batchFilter[0].student?.fatherId &&
          (await getParents(batchFilter[0].student?.fatherId));

        for (const index in batchFilter) {
          const newArray = batchFilter[index];
          batchFilter[index] = {
            ...newArray._doc,
            guardian,
            father: father ? father : {},
            mother,
            siblings: siblings?.flat(),
          };
        }
        res.json(batchFilter);
      } else {
        res.json([]);
      }
      // res.json(items.filter((item) => !item.deletedAt));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.list = (req, res) => {
  Entity.find()
    .byBranchId(req.query.branchId)
    .byServiceId(req.query.serviceId)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.find = (req, res) =>
  Entity.findById(req.params.id)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

//

exports.enrolleeDesicion = (req, res) => {
  const { status, section, assessedBy, issues } = req.body;

  Entity.findByIdAndUpdate(
    { _id: req.query.id },
    { status: status, assessedBy, issues: status === "deny" ? issues : [] }
  )
    .then((item) => {
      if (status === "approved") {
        Sections.findOneAndUpdate(
          { _id: section.id },
          { studenArr: section.newSection }
        ).catch((error) => res.status(400).json({ error: error.message }));
      }

      res.json({ status: "Successfully" });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
// entity/update?id
exports.approved = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, {
    status: "active",
  })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.destroy = (req, res) => {
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch((error) => res.status(400).json({ error: error.message }));
};
