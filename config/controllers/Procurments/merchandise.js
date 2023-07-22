const Entity = require("../../models/Procurements/Merchandise");
exports.save = (req, res) => {
  const { merchandise } = req.body;
  Entity.create(merchandise)
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));
};
