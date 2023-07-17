const Entity = require("../../../models/Assets/Procurements");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.machine = (req, res) => {
  Entity.find({ branch: req.query.branch, category: "machines" })

    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};
// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .populate({
      path: "branchId",
      select: "name",
    })
    .then((items) =>
      res.json(
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    )
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
