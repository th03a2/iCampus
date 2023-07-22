const Entity = require("../../models/Results/Preference");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branchId)
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/branch/
exports.whereIn = (req, res) => {
  const { services, branchId } = req.query;
  const _services = services.split(",");
  Entity.find()
    .byBranchId(branchId)
    .then((items) =>
      res.json(
        items.filter((item) => _services.includes(String(item.serviceId)))
      )
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};

// entity/:id/details
exports.details = (req, res) =>
  Entity.findById(req.query.id)
    .populate({
      path: "branchId",
      select: "name subName",
    })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

/**
 * SORT
 * @param {servicesObj} req
 * @param {services with references} res
 *
 * [
 *  {
 *    value:75,
 *    service: <object>
 *    reference: <object>
 *  }
 * ]
 */

exports.sort = (req, res) => {
  Entity.filter(req.query.id)
    .then((item) => {
      res.json(item);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byBranchId(req.query.id)
    .populate({
      path: "branchId",
      select: "name subName",
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
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.query.id))
    .catch((error) => res.status(400).json({ error: error.message }));
