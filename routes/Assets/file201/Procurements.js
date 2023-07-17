const router = require("express").Router(),
  {
    browse,
    machine,
    find,
    save,
    update,
    destroy,
  } = require("../../../controllers/Assets/file201/Procurements"),
  { protect } = require("../../../middleware");

router
  .get("/", protect, browse)
  .get("/machine", machine)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
