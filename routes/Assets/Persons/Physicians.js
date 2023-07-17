const router = require("express").Router(),
  {
    browse,
    petition,
    find,
    update,
    save,
  } = require("../../../controllers/Assets/Persons/Physicians"),
  { protect } = require("../../../middleware");

//  http://localhost:5000/assets/persons/physicians/browse?branch=637097f0535529a3a57e933e
router
  .get("/browse", browse)
  .get("/petition", protect, petition)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update);

module.exports = router;
