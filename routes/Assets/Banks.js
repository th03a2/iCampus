const router = require("express").Router(),
  { browse } = require("../../controllers/Assets/Banks"),
  { protect } = require("../../middleware");

router.get("/browse", protect, browse);

module.exports = router;
