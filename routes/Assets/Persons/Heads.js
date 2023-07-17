const router = require("express").Router(),
  {
    browse,
    find,
    update,
    save,
    updateOrCreate,
    archive,
    destroy,
  } = require("../../../controllers/Assets/Persons/Heads"),
  { protect } = require("../../../middleware");

router
  .get("/browse", browse)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update)
  .put("/updateOrCreate", updateOrCreate)
  .put("/archive", archive)
  .delete("/destroy", protect, destroy);

module.exports = router;
