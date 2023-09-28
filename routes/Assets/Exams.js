const router = require("express").Router(),
  { browse, save } = require("../../controllers/Assets/Exams"),
  { protect } = require("../../middleware");

router.get("/browse", browse).post("/save", protect, save);

module.exports = router;
