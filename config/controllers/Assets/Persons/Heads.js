// entity/save
const Entity = require("../../../models/Assets/Persons/Heads"),
  Logs = require("../../../models/Logs");

exports.browse = (req, res) =>
  Entity.find()
    .byBranch(req.query.branch)
    .populate("user")
    .lean()
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

exports.find = (req, res) =>
  Entity.findById(req.params.id)
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/updateOrCreate
exports.updateOrCreate = ({ body }, res) =>
  Entity.findOne({
    branch: body.branch,
    department: body.department,
  })
    .then(item => {
      if (item) {
        Entity.findByIdAndUpdate(
          item._id,
          {
            user: body.user,
            deletedAt: null,
          },
          {
            new: true,
          }
        )
          .then(data => res.json(data))
          .catch(error => res.status(400).json({ error: error.message }));
      } else {
        Entity.create(body)
          .then(item => res.json(item))
          .catch(error => res.status(400).json({ error: error.message }));
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/archive
exports.archive = ({ body }, res) =>
  Entity.findOne({
    branch: body.branch,
    department: body.department,
    // deletedAt: { $ne: null },
  }).then(item => res.json(item));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.query.id))
    .catch(error => res.status(400).json({ error: error.message }));
