// entity/save
const Entity = require("../../models/Assets/Employees"),
  Companie = require("../../models/Assets/Companies"),
  Branches = require("../../models/Assets/Branches");

exports.browse = (req, res) => {
  const { branchId, status } = req.query;
  Entity.find({ status })
    .byBranch(branchId)
    .populate("user")
    .populate("branchId")
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

exports.save = (req, res) =>
  Entity.create(req.body)
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

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
    .then(() => res.json(req.query.id))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.school = (req, res) => {
  Branches.find()
    .populate("companyId")
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.search = (req, res) => {
  Companie.find({ schoolId: req.query.schoolId })
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};
