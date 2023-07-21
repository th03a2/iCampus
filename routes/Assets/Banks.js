const router = require("express").Router(),
  { browse, destroy } = require("../../controllers/Assets/Banks"),
  { protect } = require("../../middleware");

router.get("/browse", protect, browse).delete("/destroy", destroy);

module.exports = router;
