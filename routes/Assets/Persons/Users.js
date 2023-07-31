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
    siblings,
    saveSiblings,
    getSiblings,
    addSiblings,
    getGuardian,
  } = require("../../../controllers/Assets/Persons/Users"),
  { protect } = require("../../../middleware");

router
  .get("/browse", protect, browse)
  .get("/physicians/browse", physicians) // patrons with title Dr.
  .get("/siblings", siblings)
  .get("/saveSiblings", saveSiblings)
  .get("/addSiblings", addSiblings)
  .get("/getGuardian", getGuardian)
  .get("/parents", parents)
  .get("/archive", protect, archive)
  .get("/getSiblings", getSiblings)
  .get("/find", protect, find)
  .put("/update", update)
  .put("/restore", protect, restore)
  .delete("/destroy", protect, destroy);

module.exports = router;
