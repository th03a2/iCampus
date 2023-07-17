const router = require("express").Router(),
  { find, logout } = require("../../../controllers/Assets/Persons/Attendances"),
  { protect } = require("../../../middleware");

router.get("/find", protect, find).get("/logout", protect, logout);

module.exports = router;
