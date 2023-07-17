const router = require("express").Router(),
  {
    browse,
    save,
    find,
    update,
    list,
  } = require("../../controllers/Responsibilities/Maintenance"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/list", list)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update);

module.exports = router;
