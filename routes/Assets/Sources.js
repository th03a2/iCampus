const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
    update,
    list,
  } = require("../../controllers/Assets/Sources"),
  { protect } = require("../../middleware");

//invalis ko protect sa delete at update

router
  .get("/browse", browse)
  .get("/list", list)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", destroy);

module.exports = router;
