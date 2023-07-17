const router = require("express").Router(),
  {
    browse,
    save,
    destroy,
  } = require("./../../controllers/Finance/Liabilities"),
  { protect } = require("./../../middleware");

router
  .get("/browse", browse)
  .get("/list", browse)
  .post("/save", protect, save)
  .delete("/destroy", protect, destroy);

module.exports = router;
