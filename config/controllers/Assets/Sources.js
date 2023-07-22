const Entity = require("../../models/Assets/Sources");

// entity/
exports.browse = (req, res) =>
  Entity.find({
    $or: [{ vendors: req.query.branchId }, { clients: req.query.branchId }],
  })
    .populate("vendors")
    .populate("clients")
    .lean()
    .then(items => {
      const notDeleted = items.filter(item => !item.deletedAt);

      const vendors = notDeleted.filter(
        ({ vendors }) => vendors && vendors._id.equals(req.query.branchId)
      );
      const clients = notDeleted.filter(
        ({ clients }) => clients && clients._id.equals(req.query.branchId)
      );

      res.json({ vendors, clients });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.list = (req, res) =>
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
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));
// entity/:id/find}
exports.find = (req, res) =>
  Entity.find()
    .populate({
      path: "branchId",
      select: "name",
    })
    .then(items =>
      res.json(
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.query.id))
    .catch(error => res.status(400).json({ error: error.message }));
