const router = require("express").Router(),
  { browse, destroy, save } = require("../../controllers/Assets/Banks"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .delete("/destroy", destroy)
  .post("/save", protect, save);

module.exports = router;
