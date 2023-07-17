const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    details,
  } = require("../../../controllers/Results/Radiology/Ecg"),
  { protect } = require("../../../middleware");

router
  .get("/", protect, browse)
  .get("/find", protect, find)
  .get("/details", protect, details)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
