// entity/save
const Entity = require("../../../models/Assets/Persons/Personnels");

exports.browse = (req, res) => {
  Entity.find()
    .byBranch(req.query.branch ? req.query.branch : req.query.key)
    .populate("user")
    .then(personels => res.json(personels))
    .catch(error => res.status(400).json({ error: error.message }));
};
exports.application = (req, res) => {
  Entity.find()
    .byUser(req.query.auth)
    .populate("branch")
    .then(branches => res.json(branches))
    .catch(error => res.status(400).json({ error: error.message }));
};
exports.employees = (req, res) =>
  Entity.find({ branch: req.query.branch, status: "active" })
    .populate("user")
    .then(personels => res.json(personels))
    .catch(error => res.status(400).json({ error: error.message }));

exports.petition = (req, res) =>
  Entity.find({
    branch: req.query.branch,
    status: { $in: ["petition", "banned"] },
  })
    .populate("user")
    .then(personels => res.json(personels))
    .catch(error => res.status(400).json({ error: error.message }));

exports.find = (req, res) =>
  Entity.findById(req.params.id)
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/update?id
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
