const Entity = require("../../../models/Results/Laboratory/Miscellaneous"),
  User = require("../../../models/Assets/Persons/Users");
const getPersonnel = async pk =>
  await User.find({
    _id: pk,
  }).then(user => user);

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
exports.save = async (req, res) => {
  const { body } = req;
  try {
    if (Array.isArray(body)) {
      const bulkOperations = body.map(item => {
        const { saleId, packages, customerId, branchId } = item;
        return {
          updateOne: {
            filter: { saleId, packages },
            update: { $set: { saleId, customerId, branchId, packages } },
            upsert: true, // upsert means update or create
          },
        };
      });

      const result = await Entity.bulkWrite(bulkOperations);

      if (result.hasWriteErrors()) {
        // Handle write errors if necessary
        return res
          .status(400)
          .json({ error: "Failed to update some documents." });
      }

      return res.json({
        success: "Bulk update successful.",
        payload: body,
      });
    } else {
      const { saleId, packages, customerId, branchId } = body;
      const filter = { saleId, packages };
      const update = { $set: { saleId, customerId, branchId, packages } };
      const options = { upsert: true }; // upsert means update or create

      const result = await Entity.updateOne(filter, update, options);

      if (result.nModified === 0 && !result.upserted) {
        // Handle the case where no document was updated or created
        return res
          .status(400)
          .json({ error: "No document was updated or created." });
      }

      return res.json({
        success: "Update or create successful.",
        payload: req.body,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .populate("customerId")
    .populate("branchId")
    .populate("signatories")
    .populate("saleId")
    .then(item => res.json(item))
    // .then(async item => {
    //   const _signatory = await item.signatories.map(signatory =>
    //     getPersonnel(signatory)
    //   );

    //   res.json({ ...item, signatories: [..._signatory] });
    // })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.query.id))
    .catch(error => res.status(400).json({ error: error.message }));
