const router = require("express").Router(),
  {
    browse,
    destroy,
    approved,
    save,
  } = require("../../controllers/Assets/Enrollment"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .delete("/destroy", protect, destroy)
  .put("/approved", protect, approved)
  .post("/save", save);

module.exports = router;
