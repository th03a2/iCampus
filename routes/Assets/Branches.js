const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
    archive,
    cluster,
    update,
  } = require("../../controllers/Assets/Branches"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .get("/list", protect, browse)
  .get("/cluster", protect, cluster)
  .get("/archive", protect, archive)
  .post("/save", protect, save)
  .put("/update", protect, update)
  .delete("/destroy", protect, destroy);

module.exports = router;
