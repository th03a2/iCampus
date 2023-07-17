const router = require("express").Router(),
  {
    browse,
    sort,
    find,
    save,
    update,
    destroy,
    details,
    whereIn,
  } = require("../../controllers/Results/Preference"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/sort", protect, sort)
  .get("/whereIn", whereIn)
  .get("/find", protect, find)
  .get("/details", protect, details)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
