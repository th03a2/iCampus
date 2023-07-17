const router = require("express").Router(),
  { save } = require("../testingMigrations");

router.post("/", save);

module.exports = router;
