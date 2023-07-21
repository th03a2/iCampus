const Entity = require("../../../models/Results/Laboratory/Serology");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .populate({
      path: "companyId",
      select: "name subName",
    })
    .populate({
      path: "managerId",
      select: "fullName email roles",
    })
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/details
exports.details = (req, res) =>
  Entity.findById(req.query.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .populate({
      path: "customerId",
      select: "fullName email roles",
    })
    .populate({
      path: "saleId",
      select: "created_at",
    })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byBranchId(req.query.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .populate({
      path: "customerId",
      select: "fullName email roles",
    })
    .populate({
      path: "saleId",
      select: "created_at",
    })
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
// updateOneOrCreate
exports.save = (req, res) =>
  Entity.updateOne({ _id: req.body._id }, { $set: req.body }, { upsert: true })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .populate("customerId")
    .populate("branchId")
    .populate("signatories")
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.query.id))
    .catch(error => res.status(400).json({ error: error.message }));
