const router = require("express").Router(),
  {
    browse,
    destroy,
    approved,
    save,
    enrolleeDesicion,
  } = require("../../controllers/Assets/Enrollment"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .delete("/destroy", protect, destroy)
  .put("/approved", protect, approved)
  .put("/update", protect, enrolleeDesicion)
  .post("/save", save);

module.exports = router;
