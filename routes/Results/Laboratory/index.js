const Chemistry = require("./Chemistry");
const Hematology = require("./Hematology");
const Miscellaneous = require("./Miscellaneous");
const Fecalysis = require("./Fecalysis");
const Serology = require("./Serology");
const Urinalysis = require("./Urinalysis");
const Coagulation = require("./Coagulation");
const Drugtest = require("./Drugtest");

const laboratory = [
  {
    root: "chemistry",
    routes: Chemistry,
  },
  {
    root: "hematology",
    routes: Hematology,
  },
  {
    root: "miscellaneous",
    routes: Miscellaneous,
  },
  {
    root: "parasitology",
    routes: Fecalysis,
  },
  {
    root: "serology",
    routes: Serology,
  },
  {
    root: "urinalysis",
    routes: Urinalysis,
  },
  {
    root: "coagulation",
    routes: Coagulation,
  },
  {
    root: "drugtest",
    routes: Drugtest,
  },
];

module.exports = laboratory;
