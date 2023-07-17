const Entity = require("../../models/Responsibilities/Monitorings/Temperatures");

// entity/
exports.browse = (req, res) => {
  Entity.find()
    .byBranchId(req.query.branchId)
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.list = (req, res) => {
  Entity.find({
    $expr: {
      $and: [
        { $eq: [{ $year: "$createdAt" }, req.query.year] },
        { $eq: [{ $month: "$createdAt" }, req.query.month] },
      ],
    },
  })
    .byBranchId(req.query.branchId)
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byBranchId(req.params.id)
    .populate({
      path: "branchId",
      select: "name",
    })
    .then(items =>
      res.json(
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) => {
  Entity.create(req.body)
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
};
// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.query.id))
    .catch(error => res.status(400).json({ error: error.message }));
