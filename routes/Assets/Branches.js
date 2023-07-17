const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
    archive,
    cluster,
  } = require("../../controllers/Assets/Branches"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/list", browse)
  .get("/cluster", cluster)
  .get("/archive", protect, archive)
  .post("/save", save)
  .delete("/destroy", protect, destroy);

module.exports = router;
