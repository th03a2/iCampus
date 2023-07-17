const router = require("express").Router(),
  {
    browse,
    update,
    save,
  } = require("../../controllers/Responsibilities/Access"),
  { protect } = require("../../middleware");

router.get("/browse", browse).put("/update", update).post("/save", save);

module.exports = router;
