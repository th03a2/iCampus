// entity/save
const Entity = require("../../../models/Assets/Persons/Physicians");

exports.browse = (req, res) =>
  Entity.find()
    .byBranch(req.query.branch)
    .populate("user")
    .then(personels => res.json(personels))
    .catch(error => res.status(400).json({ error: error.message }));

exports.petition = (req, res) =>
  Entity.find({ isDefault: true })
    .byUser(req.query.id)
    .populate("user")
    .then(personels => {
      const cluster = personels.filter(
        personel => personel.status === req.query.status
      );
      res.json(cluster);
    })
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
