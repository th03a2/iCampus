const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    list,
  } = require("../../controllers/Monitorings/Temperatures"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/list", list)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", destroy);

module.exports = router;
