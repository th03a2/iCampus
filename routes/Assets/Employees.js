const router = require("express").Router(),
  {
    browse,
    destroy,
    update,
    save,
    search,
    school,
  } = require("../../controllers/Assets/Employees"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .delete("/destroy", protect, destroy)
  .put("/update", protect, update)
  .post("/save", protect, save)
  .get("/school", protect, school)
  .get("/search", search);

module.exports = router;
