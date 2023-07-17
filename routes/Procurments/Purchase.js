const router = require("express").Router(),
  {
    save,
    browse,
    request,
    update,
    approved,
  } = require("../../controllers/Procurments/Purchase"),
  { protect } = require("../../middleware");

router
  .post("/save", protect, save)
  .get("/browse", protect, browse)
  .get("/request", request)
  .put("/update", protect, update)
  .get("/approved", protect, approved);

module.exports = router;
