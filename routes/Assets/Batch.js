const router = require("express").Router(),
  {
    browse,
    destroy,
    update,
    save,
    enrollment,
    dashboard,
  } = require("../../controllers/Assets/Batch"),
  { protect } = require("../../middleware");

router
  .get("/browse", protect, browse)
  .get("/enrollment", enrollment)
  .delete("/destroy", protect, destroy)
  .put("/update", protect, update)
  .post("/save", protect, save)
  .get("/dashboard", protect, dashboard);

module.exports = router;
