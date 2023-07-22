const Entity = require("../../models/Accreditations/Areas");

// entity/
exports.browse = (req, res) =>
  Entity.find({ branchId: req.query.branchId, tools: req.query.tools })
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/details (attributes)
exports.details = (req, res) =>
  Entity.findById(req.params.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byBranchId(req.params.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.create(req.body)
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch((error) => res.status(400).json({ error: error.message }));
