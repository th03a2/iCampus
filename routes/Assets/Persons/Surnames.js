const router = require("express").Router(),
  {
    browse,
    save,
    update,
    destroy,
    archive,
    restore,
    unresolved,
  } = require("../../../controllers/Assets/Persons/Surnames"),
  { protect } = require("../../../middleware");

router
  .get("/browse", browse)
  .get("/archive", protect, archive)
  .get("/unresolved", protect, unresolved)
  .post("/save", save)
  .put("/update", update)
  .put("/restore", protect, restore)
  .delete("/destroy", protect, destroy);

module.exports = router;
