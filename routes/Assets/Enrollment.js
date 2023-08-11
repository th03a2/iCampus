const router = require("express").Router(),
  {
    browse,
    destroy,
    save,
    enrolleeDesicion,
    sections,
  } = require("../../controllers/Assets/Enrollment"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/sections", sections)
  .delete("/destroy", protect, destroy)
  .put("/update", protect, enrolleeDesicion)
  .post("/save", save);

module.exports = router;
