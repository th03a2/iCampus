const Entity = require("../../../models/Procurements/Product"),
  Logs = require("../../../models/Logs");

exports.market = (req, res) =>
  Entity.find()

    // .populate({
    //   path: "owner",
    //   select: "fullName email",
    //   populate: {
    //     path: "fullName.mname fullName.lname",
    //     select: "name",
    //   },
    // })

    .sort({ createdAt: -1 })
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.browse = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branch)
    // .populate({
    //   path: "owner",
    //   select: "fullName email",
    //   populate: {
    //     path: "fullName.mname fullName.lname",
    //     select: "name",
    //   },
    // })

    .sort({ createdAt: -1 })
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
exports.cluster = (req, res) =>
  Entity.find()
    .byCompanyId(req.params.id)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
// entity/
exports.archive = (req, res) =>
  Entity.find()
    // .select("-__v")
    // .populate({
    //   path: "owner",
    //   select: "fullName email",
    //   populate: {
    //     path: "fullName.mname fullName.lname",
    //     select: "name",
    //   },
    // })
    .sort({ createdAt: -1 })
    .then((items) => res.json(items.filter((item) => item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.save = (req, res) =>
  Entity.create(req.body)
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));
// entity/:id/destroy
// exports.destroy = (req, res) =>
//   Entity.findByIdAndUpdate(req.query.id, {
//     deletedAt: new Date().toLocaleString(),
//   })
//     .then(() =>
//       Logs.create({
//         model: "companies",
//         itemId: req.query.id,
//         action: "delete",
//         user: res.locals.callerId,
//       }).then(() => res.json(req.query.id))
//     )
//     .catch((error) => res.status(400).json({ error: error.message }));
