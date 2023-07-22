const router = require("express").Router(),
  {
    browse,
    save,
    update,
    destroy,
  } = require("../../controllers/Assets/Sections"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .put("/update", protect, update)
  .delete("/destroy", protect, destroy)
  .post("/save", protect, save);

module.exports = router;
