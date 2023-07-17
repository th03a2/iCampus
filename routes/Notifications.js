const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
  } = require("../controllers/Notifications"),
  { protect } = require("../middleware");

router
  .get("/", protect, browse)
  .get("/:id/find", protect, find)
  .post("/save", save)
  .put("/:id/update", update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
