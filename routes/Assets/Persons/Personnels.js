const router = require("express").Router(),
  {
    browse,
    application,
    employees,
    petition,
    find,
    update,
    save,
  } = require("../../../controllers/Assets/Persons/Personnels"),
  { protect } = require("../../../middleware");

router
  .get("/browse", browse)
  .get("/application", application)
  .get("/employees", employees)
  .get("/petition", petition)
  .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update);

module.exports = router;
