const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    details,
  } = require("../../controllers/Accreditations/Parameters"),
  { protect } = require("../../middleware");

router
  .get("/", protect, browse)
  .get("/:id/find", protect, find)
  .get("/:id/details", protect, details)
  .post("/save", save)
  .put("/:id/update", update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
