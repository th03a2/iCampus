const router = require("express").Router(),
  { browse } = require("../../controllers/Assets/Sections"),
  { protect } = require("../../middleware");

router.get("/browse", protect, browse);

module.exports = router;
