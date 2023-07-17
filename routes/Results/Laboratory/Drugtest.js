const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    details,
  } = require("../../../controllers/Results/Laboratory/Drugtest"),
  { protect } = require("../../../middleware");

router
  .get("/", browse)
  .get("/find", protect, find)
  .get("/details", details)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
