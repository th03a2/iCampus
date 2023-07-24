// entity/save
const Entity = require("../../models/Assets/Enrollments"),
  Guardians = require("../../models/Assets/Guardians");

exports.save = (req, res) => {
  const { enrollee, guardians } = req.body;

  Entity.create(enrollee)
    .then((item) => {
      Guardians.create(guardians);
      res.json("Successfull Enroll");
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.browse = (req, res) => {
  Entity.find()
    .populate("batch")

    .populate("user")
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
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
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
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
