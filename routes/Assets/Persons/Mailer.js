const router = require("express").Router(),
  {
    sendLink,
    sendCode,
  } = require("../../../controllers/Assets/Persons/Mailer");

router.post("/link", sendLink).post("/code", sendCode);

module.exports = router;
