const Entity = require("./../../models/Finance/Liability");

exports.browse = (req, res) =>
  Entity.find()
    .byBranch(req.query.branch)
    // .populate("branchId")
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .populate({
      path: "userId",
      select: "fullName",
    })
    .populate({
      path: "supplier",
      select: "name companyName",
    })
    .populate({
      path: "particular",
      select: "fullName",
    })
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/details
exports.details = (req, res) =>
  Entity.findById(req.params.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .populate({
      path: "customerId",
      select: "fullName",
    })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byCompanyId(req.params.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .populate({
      path: "customerId",
      select: "fullName",
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
