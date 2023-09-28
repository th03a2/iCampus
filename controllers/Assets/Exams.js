const bulkWrite = require("../../config/bulkWrite");
const Entity = require("../../models/Assets/Exams"),
  Questions = require("../../models/Assets/Questions");

const getQuestions = async (pk) =>
  await Questions.find({
    purchase: pk,
  }).populate("product");

exports.save = (req, res) => {
  Entity.create(req.body.exam)
    .then((data) => {
      const { questions } = req.body;

      var newArr = [];

      questions?.map((item) => {
        const form = { ...item };
        form.examId = data._id;
        newArr.push(form);
      });

      if (newArr.length > 1) {
        Questions.insertMany(newArr);
      } else {
        Questions.create(newArr[0]);
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
        const merchandises = await getQuestions(purchase._id);
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
        const merchandises = await getQuestions(purchase._id);
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
      bulkWrite(Questions, merchandises)
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
