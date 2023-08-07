const router = require("express").Router(),
  {
    browse,
    find,
    update,
    destroy,
    archive,
    restore,
    physicians,
    parents,
    search,
  } = require("../../../controllers/Assets/Persons/Users"),
  { protect } = require("../../../middleware");

router
  .get("/browse", protect, browse)
  .get("/physicians/browse", physicians) // patrons with title Dr.
  .get("/search", search)
  .get("/parents", parents)
  .get("/archive", protect, archive)
  .get("/find", protect, find)
  .put("/update", update)
  .put("/restore", protect, restore)
  .delete("/destroy", protect, destroy);

module.exports = router;
