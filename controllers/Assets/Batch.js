// entity/save
const Entity = require("../../models/Assets/Batch"),
  Companies = require("../../models/Assets/Companies");

const getCompanies = async (pk) =>
  await Companies.find({
    _id: pk,
  });

exports.browse = (req, res) => {
  Entity.find()
    .byBranch(req.query.key)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.enrollment = (req, res) => {
  Entity.find({ status: "active" })
    .populate("schoolId")
    .then(async (items) => {
      let enrollments = items.filter((item) => !item.deletedAt);
      for (const index in enrollments) {
        let enrollment = enrollments[index];

        const companies = await getCompanies(enrollment.schoolId?.companyId);
        enrollments[index] = {
          ...enrollment._doc,
          companies,
        };
      }

      res.json(enrollments);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
exports.dashboard = (req, res) => {
  // para sa dashboard kung ilan na yung naka enroll
  Entity.find({ status: "active" })
    .populate("schoolId")
    .byBranch(req.query.branch)
    .then(async (items) => {
      let enrollments = items.filter((item) => !item.deletedAt);
      for (const index in enrollments) {
        let enrollment = enrollments[index];

        const companies = await getCompanies(enrollment.schoolId?.companyId);
        enrollments[index] = {
          ...enrollment._doc,
          companies,
        };
      }

      res.json(enrollments);
    })
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
