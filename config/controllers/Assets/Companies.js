const Entity = require("../../models/Assets/Companies"),
  Branch = require("../../models/Assets/Branches"),
  Logs = require("../../models/Logs");

const getBranches = async (pk) =>
  await Branch.find({
    companyId: pk,
  }).then((branches) => branches);

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .select("-__v")
    .populate({
      path: "ceo",
      select: "fullName email",
    })
    .sort({ createdAt: -1 })
    .then(async (items) => {
      let companies = items.filter((item) => !item.deletedAt);
      for (let index = 0; index < companies.length; index++) {
        let company = companies[index];
        const branches = await getBranches(company._id);
        companies[index] = { ...company._doc, branches: [...branches] };
      }
      res.json(companies);
    })
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/
exports.archive = (req, res) =>
  Entity.find()
    .select("-__v")
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

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() =>
      Logs.create({
        model: "companies",
        itemId: req.query.id,
        action: "delete",
        user: res.locals.callerId,
      }).then(() => res.json(req.query.id))
    )
    .catch((error) => res.status(400).json({ error: error.message }));

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
