const Entity = require("../../../models/Assets/Persons/Surnames"),
  Logs = require("../../../models/Logs");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .approved(true)
    .select("-__v -approved")
    .sort({ createdAt: -1 })
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/unresolved
exports.unresolved = (req, res) =>
  Entity.find()
    .approved(false)
    .select("-__v -approved")
    .sort({ createdAt: -1 })
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/archive
exports.archive = (req, res) =>
  Entity.find()
    .sort({ createdAt: -1 })
    .then(items => res.json(items.filter(item => item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
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

// entity/:id/restore
exports.restore = (req, res) =>
  Entity.findByIdAndUpdate(
    req.query.id,
    { deletedAt: "" },
    {
      new: true,
    }
  )
    .then(item =>
      Logs.create({
        model: "surnames",
        itemId: req.query.id,
        action: "restore",
        user: res.locals.callerId,
      }).then(() => res.json(item))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() =>
      Logs.create({
        model: "surnames",
        itemId: req.query.id,
        action: "delete",
        user: res.locals.callerId,
      }).then(() => res.json(req.query.id))
    )
    .catch(error => res.status(400).json({ error: error.message }));
