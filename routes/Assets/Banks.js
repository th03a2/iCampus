const router = require("express").Router(),
  { browse, destroy, save, update } = require("../../controllers/Assets/Banks"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .delete("/destroy", destroy)
  .put("/update", protect, update)
  .post("/save", protect, save);

module.exports = router;
