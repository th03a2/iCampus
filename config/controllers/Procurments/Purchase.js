const bulkWrite = require("../../config/bulkWrite");
const Entity = require("../../models/Procurements/Purchase"),
  Merchandise = require("../../models/Procurements/Merchandise");

const getMerchandise = async (pk) =>
  await Merchandise.find({
    purchase: pk,
  }).populate("product");

exports.save = (req, res) => {
  Entity.create(req.body.purchase)
    .then((data) => {
      const { merchandises } = req.body;

      var newArr = [];

      merchandises?.map((item) => {
        const form = { ...item };
        form.purchase = data._id;
        newArr.push(form);
      });

      if (newArr.length > 1) {
        Merchandise.insertMany(newArr);
      } else {
        Merchandise.create(newArr[0]);
      }

      res.json(data);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.browse = (req, res) => {
  Entity.find({ status: "pending" })
    .byUserId(req.query.key)
    .populate("productId")
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

      res.json(items);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

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

exports.update = (req, res) => {
  const { merchandises, purchase } = req.body;
  Entity.findByIdAndUpdate(purchase._id, purchase, { new: true }).then(() => {
    if (!!merchandises) {
      bulkWrite(Merchandise, merchandises)
        .then(() => {
          res.json("Update Success");
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    } else {
      res.json("Deny Success");
    }
  });
};

exports.approved = (req, res) => {
  Entity.find({ status: "approved" })
    .byUserId(req.query.key)
    .populate("approvedBy")
    .populate("productId")
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));
};
