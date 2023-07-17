const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    offers,
  } = require("../../controllers/Commerce/Menus"),
  { protect } = require("../../middleware");

router
  .get("/", browse)
  .get("/offers", offers)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
