const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    details,
  } = require("../../controllers/Accreditations/Areas"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/find", protect, find)
  .get("/details", protect, details)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
