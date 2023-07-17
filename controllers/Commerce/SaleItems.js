const Entity = require("../../models/Commerce/SaleItems"),
  Sales = require("../../models/Commerce/Sales"),
  Menus = require("../../models/Commerce/Menus");

const getMenus = async (menusArray) =>
  await Menus.find({
    _id: { $in: menusArray },
  });

// entity/
exports.browse = (req, res) =>
  Entity.find()
    // .bySaleId(req.query.key)
    .populate("saleId")
    .then((items) => res.json(items.filter((item) => !item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

// collect the services
exports.gather = (req, res) =>
  Entity.find()
    .bySaleId(req.query.key)
    .then((items) => {
      var _services = [];
      items?.map((item) =>
        item.menuId?.services.map((service) => _services.push(service))
      );
      res.json(_services);
    })
    .catch((error) => res.status(400).json({ error: error.message }));

// query month and year
exports.monthly = (req, res) =>
  Sales.find({
    branchId: req.query.branchId,
    $expr: {
      $and: [
        { $eq: [{ $year: "$createdAt" }, req.query.year] },
        { $eq: [{ $month: "$createdAt" }, req.query.month] },
      ],
    },
  })
    .select("_id")
    .then(async (sales) => {
      const _sales = Array.from(new Set(sales.map((sale) => sale._id)));
      await Entity.find({
        saleId: { $in: _sales },
      })
        .select("menuId")
        .then(async (items) => {
          const menusArray = [...new Set(items.map((obj) => obj.menuId))];
          const menus = await getMenus(menusArray);
          const services = menusArray
            .map((menu) => menus.find((item) => item._id.equals(menu)))
            .reduce((packages, item) => packages.concat(item.packages), []);
          res.json({ services, menusArray, menus });
        });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
// entity/save
exports.save = (req, res) =>
  Entity.create(req.body)
    .then((item) =>
      Entity.findById(item._id)
        .populate("saleId")
        .then((item) => res.json(item))
        .catch((error) => res.status(400).json({ error: error.message }))
    )
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("saleId")
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch((error) => res.status(400).json({ error: error.message }));
