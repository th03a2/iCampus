const router = require("express").Router(),
  { save } = require("../../controllers/Procurments/merchandise"),
  { protect } = require("../../middleware");

router.post("/save", protect, save);

module.exports = router;
