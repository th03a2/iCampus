// entity/save
const Entity = require("../../models/Assets/Enrollments"),
  User = require("../../models/Assets/Persons/Users"),
  Sections = require("../../models/Assets/Sections");

exports.save = (req, res) => {
  const { enrollee, guardians, currentSiblings, createSiblings, father } =
    req.body;

  Entity.create(enrollee)
    .then((item) => {
      if (guardians.id?.length > 5) {
        //pag naka registered na ang kaniyang guardian
        User.findOneAndUpdate(
          { _id: enrollee.student },
          {
            guardian: {
              id: guardians.id,
              relationship: guardians.relationship,
            },
          }
        ).catch((err) => res.status(400).json(err));
      } else {
        // pag hindi pa naka registered ang kaniyang guardian
        const { id, ..._guardians } = guardians;
        User.create({
          ..._guardians,
          password: "password",
          email: guardians.mobile,
        })
          .then((datas) => {
            User.findOneAndUpdate(
              { _id: enrollee.student },
              {
                guardian: {
                  id: datas._id,
                  relationship: _guardians.relationship,
                },
              }
            ).catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      }
      // para tanggalin lahat ng null na value sa may array
      const validCreateSiblings = createSiblings.filter(
        (data) => data !== null
      );
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
        Promise.all(promises)
          .then((siblingsId) => {
            const updateSiblings = [...siblingsId, ...validCurrentSiblings];
            return User.findOneAndUpdate(
              { _id: enrollee.student },
              {
                siblings: updateSiblings,
              }
            );
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        //kapag ang inadd niya na siblings ay naka registered na
        User.findOneAndUpdate(
          { _id: enrollee.student },
          {
            siblings: currentSiblings,
          }
        ).catch((error) => {
          console.error(error);
        });
      }
      const { isCreate } = father;
      const { id } = father.information;
      if (isCreate) {
        if (id.length < 2) {
          User.create({
            ...father.information,
            email: `${father.information.fullName?.fname}${father.information.fullName?.mname}${father.information.fullName?.lname}`,
            password: "password",
          })
            .then((father) => {
              User.findOneAndUpdate(
                { _id: enrollee.student },
                {
                  fatherId: father._id,
                }
              ).catch((error) => {
                console.error(error);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          User.findOneAndUpdate(
            { _id: enrollee.student },
            {
              fatherId: father.information.id,
            }
          ).catch((error) => {
            console.error(error);
          });
        }
      }

      User.find({ _id: enrollee.student })
        .then((students) => {
          Entity.findByIdAndUpdate(
            { _id: item._id },
            { siblings: students[0].siblings }
          ).catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => {
          console.error(error);
        });

      res.json({ status: "Successfully enrolled" });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
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
  Entity.find()
    .populate("batch")
    .populate("student")
    .then(async (batchs) => {
      const batchFilter = batchs.filter((item) => !item.deletedAt);
      let siblings =
        batchFilter[0].siblings?.length > 0
          ? await Promise.all(
              batchFilter[0].siblings.map(async (sibling) => {
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
        console.log(newArray);
        batchFilter[index] = {
          ...newArray._doc,
          guardian,
          father: father ? father : {},
          mother,
          siblings: siblings.flat(),
        };
      }
      res.json(batchFilter);
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
