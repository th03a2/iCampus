const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
    archive,
    update,
  } = require("../../controllers/Assets/Companies"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .get("/archive", protect, archive)
  .post("/save", protect, save)
  .put("/update", protect, update)
  .delete("/destroy", protect, destroy);

module.exports = router;
