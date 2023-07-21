const Entity = require("../../models/Commerce/Menus");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branch)
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

exports.offers = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branchId)
    .then(items =>
      res.json(items.filter(item => !item.deletedAt && item.opd > 0))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  Entity.findById(req.params.id)
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.updateOne(
    { name: req.body.name, branchId: req.body.branchId },
    { $set: req.body },
    { upsert: true }
  )
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
