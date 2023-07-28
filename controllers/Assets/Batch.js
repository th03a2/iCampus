// entity/save
const Entity = require("../../models/Assets/Batch");

const getRooms = async (pk) =>
  await Merchandise.find({
    purchase: pk,
  }).populate("product");

exports.request = (req, res) => {
  Entity.find({ status: req.query.status })
    .byBranchId(req.query.branch)
    .populate("userId")
    .then(async (items) => {
      let purchases = items.filter((item) => !item.deletedAt);
      for (let index = 0; index < purchases.length; index++) {
        let purchase = purchases[index];
        const merchandises = await getMerchandise(purchase._id);
        purchases[index] = {
          ...purchase._doc,
          merchandises: [...merchandises],
        };
      }
      res.json(purchases);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.browse = (req, res) => {
  Entity.find()
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.enrollment = (req, res) => {
  Entity.find({ status: "start" })
    .populate("school_id")
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.list = (req, res) => {
  Entity.find()
    .byBranchId(req.query.branchId)
    .byServiceId(req.query.serviceId)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.find = (req, res) =>
  Entity.findById(req.params.id)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.save = (req, res) =>
  Entity.create(req.body)
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/update?id
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

exports.destroy = (req, res) => {
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch((error) => res.status(400).json({ error: error.message }));
};
