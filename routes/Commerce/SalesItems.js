const router = require("express").Router(),
  {
    browse,
    monthly,
    save,
    update,
    destroy,
  } = require("../../controllers/Commerce/SaleItems"),
  { protect } = require("../../middleware");

router
  .get("/", browse)
  .get("/monthly", monthly)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;
