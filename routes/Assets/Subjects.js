const router = require("express").Router(),
  { browse } = require("../../controllers/Assets/Subjects"),
  { protect } = require("../../middleware");

router.get("/browse", protect, browse);

module.exports = router;
