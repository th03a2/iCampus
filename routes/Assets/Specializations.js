const router = require("express").Router(),
  {
    browse,
    destroy,
    update,
    save,
  } = require("../../controllers/Assets/Specializations"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .delete("/destroy", protect, destroy)
  .put("/update", protect, update)
  .post("/save", protect, save);

module.exports = router;
