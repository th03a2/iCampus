const router = require("express").Router(),
  { browse } = require("../../controllers/Assets/Strands"),
  { protect } = require("../../middleware");

router.get("/browse", protect, browse);

module.exports = router;
