const Entity = require("../../models/Responsibilities/Access");

exports.browse = (req, res) => {
  Entity.find()
    .byBranchId(req.query.branchId)
    .byUserId(req.query.userId)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.update = (req, res) => {
  const { approvedBy, status, platform } = req.body;
  const data = {
    approvedBy,
    status,
  };
  Entity.findOneAndUpdate({ userId: req.query.id, platform }, data, {
    new: true,
  })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.save = (req, res) =>
  Entity.create(req.body)
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));
