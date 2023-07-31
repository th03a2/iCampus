// entity/save
const Entity = require("../../models/Assets/Enrollments"),
  User = require("../../models/Assets/Persons/Users");

exports.save = (req, res) => {
  const { enrollee, guardians } = req.body;

  Entity.create(enrollee)
    .then((item) => {
      if (guardians.id) {
        if (guardians.id.length > 5) {
          //pag naka registered na ang kaniyang guardian
          User.findOneAndUpdate(
            { _id: enrollee.student },
            {
              guardian: {
                id: guardians.id,
                relationship: guardians.relationship,
              },
            }
          ).then((datas) => res.json({ status: "successfully" }));
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
              )
                .then((data) => res.json({ status: "Successfully" }))
                .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
        }
      } else {
        res.json({ status: "success" });
      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.browse = (req, res) => {
  Entity.find()
    .populate("batch")
    .populate("student")
    .then((batchs) => {
      const batchFilter = batchs.filter((item) => !item.deletedAt);

      const promises = batchFilter.map((batch) => {
        return Guardians.find({ studentId: batch.student }).then(
          (guardians) => {
            return {
              ...batch.toObject(),
              guardians,
            };
          }
        );
      });
      Promise.all(promises)
        .then((batchsWithGuardians) => {
          res.json(batchsWithGuardians);
        })
        .catch((error) => res.status(400).json({ error: error.message }));

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
