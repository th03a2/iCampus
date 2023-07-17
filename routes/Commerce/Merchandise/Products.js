const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
    archive,
    cluster,
    update,
    market,
  } = require("../../../controllers/Commerce/Merchandise/Products"),
  { protect } = require("../../../middleware");

router
  .get("/browse", protect, browse)
  .get("/market", protect, market)
  .get("/list", protect, browse)
  .get("/cluster", protect, cluster)
  .get("/archive", protect, archive)
  .put("/update", protect, update)
  .post("/save", protect, save)
  .delete("/destroy", protect, destroy);

module.exports = router;
