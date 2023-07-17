const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
    archive,
  } = require("../../controllers/Assets/Companies"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/archive", protect, archive)
  .post("/save", save)
  .delete("/destroy", protect, destroy);

module.exports = router;
