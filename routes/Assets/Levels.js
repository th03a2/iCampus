const router = require("express").Router(),
  { browse } = require("../../controllers/Assets/Levels"),
  { protect } = require("../../middleware");

router.get("/browse", protect, browse);

module.exports = router;
