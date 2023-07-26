const router = require("express").Router(),
  {
    browse,
    destroy,
    update,
    save,
  } = require("../../controllers/Assets/Enrollment"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .delete("/destroy", protect, destroy)
  .put("/update", protect, update)
  .post("/save", save);

module.exports = router;
