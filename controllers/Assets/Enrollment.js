// entity/save
const Entity = require("../../models/Assets/Enrollments"),
  User = require("../../models/Assets/Persons/Users"),
  Sections = require("../../models/Assets/Sections"),
  Branches = require("../../models/Assets/Branches");

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
        //  kapag ang pinili niya na father ay naka registered na
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

const getBraches = async (fk) =>
  Branches.find({ _id: fk })
    .then((datas) => datas[0])
    .catch((error) => console.log(error));

exports.browse = async (req, res) => {
  try {
    var enrollees;
    if (req.query.status === "dashboard") {
      enrollees = await Entity.find().populate("batch").populate("student");
    } else {
      enrollees = await Entity.find({ status: req.query.status })
        .populate("batch")
        .populate("student");
    }
    if (enrollees.length === 0) {
      res.json([]);
    } else {
      const siblingsPromises = enrollees.map((enrollee) => {
        if (enrollee.siblings?.length > 0) {
          return Promise.all(
            enrollee.siblings.map(async (sibling) => await getSiblings(sibling))
          );
        } else {
          return [];
        }
      });

      const siblings = await Promise.all(siblingsPromises);

      const parentsPromise = enrollees.map(async (enrollee) => {
        const guardian = await getGuardian(enrollee.student?.guardian?.id);
        const father = await getParents(enrollee.student.fatherId);
        const mother = await getParents(enrollee.student.motherId);

        return {
          guardian,
          father: father ? father : {},
          mother,
        };
      });

      const parents = await Promise.all(parentsPromise);

      const sections = await Sections.find();
      const sectionsFilter = sections.filter(
        (section) => !section.deletedAt && section.studenArr.length > 0
      );

      var enrolled = enrollees.map((enrollee) => {
        const isEnrolled = sectionsFilter.find((section) =>
          section.studenArr?.includes(enrollee.student?._id.toString())
        );
        if (!isEnrolled) return null;
        return isEnrolled;
      });
      enrolled = enrolled.filter(Boolean);
      for (const index in enrollees) {
        const newArray = enrollees[index];
        const branch = await getBraches(newArray.batch.schoolId);
        enrollees[index] = {
          ...newArray._doc,
          parents: parents[index],
          siblings: siblings[index]?.flat(),
          section: req.query.status === "approved" && enrolled[index],
          branch,
        };
      }
      res.json(enrollees);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.sections = async (req, res) => {
  try {
    const sections = await Sections.find({ levelId: req.query.levelId });
    res.json(sections);
  } catch (err) {
    console.log(err);
  }
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

exports.enrolleeDesicion = async (req, res) => {
  try {
    const { status, section, assessedBy, issues } = req.body;

    await Entity.findByIdAndUpdate(
      { _id: req.query.id },
      { status: status, assessedBy, issues: status === "deny" ? issues : [] }
    );

    if (status === "approved" || status === "onprogress") {
      await Sections.findOneAndUpdate(
        { _id: section.id },
        { studenArr: section.newSection }
      );
    }
    res.json({ status: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.destroy = (req, res) => {
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch((error) => res.status(400).json({ error: error.message }));
};
