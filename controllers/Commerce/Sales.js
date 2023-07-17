const Entity = require("../../models/Commerce/Sales"),
  Sold = require("../../models/Commerce/SaleItems"),
  Analysis = require("../../models/Results/Laboratory/Analysis"),
  Biopsy = require("../../models/Results/Laboratory/Biopsy"),
  Bacteriology = require("../../models/Results/Laboratory/Bacteriology"),
  Urinalysis = require("../../models/Results/Laboratory/Urinalysis"),
  Hematology = require("../../models/Results/Laboratory/Hematology"),
  Chemistry = require("../../models/Results/Laboratory/Chemistry"),
  Drugtest = require("../../models/Results/Laboratory/Drugtest"),
  Xray = require("../../models/Results/Radiology/xray"),
  Ecg = require("../../models/Results/Radiology/ecg"),
  Serology = require("../../models/Results/Laboratory/Serology"),
  Parasitology = require("../../models/Results/Laboratory/Fecalysis"),
  Miscellaneous = require("../../models/Results/Laboratory/Miscellaneous"),
  Coagulation = require("../../models/Results/Laboratory/Coagulation"),
  Pbs = require("../../models/Results/Laboratory/Pbs"),
  Paps = require("../../models/Results/Laboratory/Paps"),
  Compatibility = require("../../models/Results/Laboratory/Compatibility"),
  Services = require("../../models/Assets/Services");

exports.testQuery = (req, res) =>
  Entity.find({
    $expr: {
      $and: [
        { $eq: [{ $year: "$createdAt" }, 2023] },
        { $eq: [{ $month: "$createdAt" }, 6] },
      ],
    },
  })
    .byBranchId(req.query.branchId)
    .then(response => {
      res.json(response);
    });

exports.browse = (req, res) =>
  Entity.find({
    $or: [{ branchId: req.query.branchId }, { source: req.query.branchId }],
  })
    .populate("branchId")
    .populate("customerId")
    .populate("cashierId")
    .populate("source")
    // .populate("subcon")
    .populate("physicianId")
    .populate("authorizedBy")
    .then(async items => {
      const available = items.filter(item => !item.deletedAt),
        daily = available.filter(
          item => new Date(item.createdAt).toDateString() === req.query.date
        );

      var _sales = [],
        services = [];
      await Services.find()
        .byBranchId(req.query.branchId)
        .then(items => (services = items));
      for (let index = 0; index < daily.length; index++) {
        const sale = daily[index];

        await Sold.find()
          .bySaleId(sale._id)
          .populate("menuId")
          .then(deals => {
            const branchId = req.query.branchId;
            const _source = sale.category && sale.source?._id;
            var newObj = { ...sale._doc };

            if (["vp", "sc", "ssc"].indexOf(sale.category) !== -1) {
              newObj["perform"] = _source.equals(branchId)
                ? "sendout"
                : "insourcing";
              newObj.deals = deals;
            } else {
              newObj["perform"] = "sales";
              newObj.deals = deals.map(deal => {
                const _deal = deal._doc;
                let inhouse = deal.menuId.packages.filter(fk => {
                  if (services.find(({ id }) => id === fk)) return fk;
                });
                return { ..._deal, inhouse, packages: deal.menuId.packages };
              });
            }
            _sales.push(newObj);
          })
          .catch(error => res.status(400).json({ error: error.message }));
      }

      res.json(_sales);
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.yearly = (req, res) =>
  Entity.find({
    branchId: req.query.branchId,
    createdAt: {
      $gte: req.query.year,
      $lt: req.query.year + 1,
    },
  })
    .select("category amount createdAt ")
    .then(items => res.json(items))
    .catch(error => res.status(400).json({ error: error.message }));

exports.monthly = (req, res) => console.log(req.query);
// Entity.find({
//   branchId: req.query.branchId,
//   createdAt: {
//     $gte: req.query.year,
//     $lt: req.query.year + 1,
//   },
// })
//   .then((items) => {
//     res.json(items);
//   })
//   .catch((error) => res.status(400).json({ error: error.message }));
// entity/
exports.remittance = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branchId)
    .populate("customerId")
    .populate("cashierId")
    .populate("physicianId")
    .populate("authorizedBy")
    .then(async items => {
      const available = items.filter(item => !item.deletedAt),
        daily = available.filter(
          item => new Date(item.createdAt).toDateString() === req.query.date
        );

      var newArr = [];

      for (let index = 0; index < daily.length; index++) {
        const sale = daily[index];

        await Sold.find()
          .bySaleId(sale._id)
          .populate("menuId")
          .then(deals => {
            var newObj = { ...sale._doc };
            newObj.deals = deals;
            newArr.push(newObj);
          })
          .catch(error => res.status(400).json({ error: error.message }));
      }

      res.json(newArr);
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.task = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branchId)
    .populate("customerId")
    .populate("physicianId")
    .populate("branchId")
    .populate("cashierId")
    .populate("source")
    .populate("authorizedBy")
    .then(async items => {
      const daily = items
        .filter(item => !item.deletedAt && item.renderedAt)
        .filter(
          item => new Date(item.createdAt).toDateString() === req.query.date
        );

      var newArr = [];

      for (let index = 0; index < daily.length; index++) {
        const element = { ...daily[index]._doc };

        const analysis = await Analysis.findById(element._id);
        const biopsy = await Biopsy.findById(element._id);
        const bacteriology = await Bacteriology.findById(element._id);
        const coagulation = await Coagulation.findById(element._id);
        const chemistry = await Chemistry.findById(element._id);
        const compatibility = await Compatibility.findById(element._id);
        const drugtest = await Drugtest.findById(element._id);
        const xray = await Xray.findById(element._id);
        const ecg = await Ecg.findById(element._id);
        const serology = await Serology.findById(element._id);
        const hematology = await Hematology.findById(element._id);
        const urinalysis = await Urinalysis.findById(element._id);
        const parasitology = await Parasitology.findById(element._id);
        const paps = await Paps.findById(element._id);
        const pbs = await Pbs.findById(element._id);
        // Multiple Results
        const miscellaneous = await Miscellaneous.find({ saleId: element._id });

        newArr.push({
          ...element,
          analysis,
          biopsy,
          bacteriology,
          chemistry,
          compatibility,
          drugtest,
          xray,
          ecg,
          serology,
          hematology,
          urinalysis,
          miscellaneous,
          coagulation,
          parasitology,
          paps,
          pbs,
        });
      }

      res.json(newArr);
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
// history of 1 patient per branch
exports.history = (req, res) =>
  Entity.find()
    .byBranchId(req.query.branchId)
    .byCustomerId(req.query.customerId)
    .populate("branchId")
    .populate("customerId")
    .populate("cashierId")
    .populate("physicianId")
    .populate("authorizedBy")
    .then(items => {
      const available = items.filter(item => !item.deletedAt);

      res.json(
        available.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) => {
  Entity.create(req.body)
    .then(data => {
      const { items } = req.body;

      var newArr = [];

      items?.map(item => {
        const form = { ...item };
        form.saleId = data._id;
        newArr.push(form);
      });

      if (newArr.length > 1) {
        Sold.insertMany(newArr);
      } else {
        Sold.create(newArr[0]);
      }

      res.json(data);
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .populate("branchId")
    .populate("customerId")
    .populate("cashierId")
    .populate("physicianId")
    .populate("authorizedBy")
    .then(item =>
      Sold.find()
        .bySaleId(item._id)
        .populate("menuId")
        .then(deals => {
          var newObj = { ...item._doc };
          newObj.deals = deals;
          res.json(newObj);
        })
        .catch(error => res.status(400).json({ error: error.message }))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
