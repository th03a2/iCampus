const Users = require("./users"),
  Heads = require("../../../models/Assets/Persons/Heads"),
  heads = require("./heads"),
  Personnels = require("../../../models/Assets/Persons/Personnels"),
  personnels = require("./personnels"),
  Physicians = require("../../../models/Assets/Persons/Physicians"),
  physicians = require("./physicians"),
  Surnames = require("../../../models/Assets/Persons/Surnames"),
  surnames = require("./surnames");

const persons = [
  Users,
  {
    entity: Heads,
    collections: heads,
    name: "heads",
  },
  {
    entity: Personnels,
    collections: personnels,
    name: "personnels",
  },
  {
    entity: Physicians,
    collections: physicians,
    name: "physicians",
  },
  {
    entity: Surnames,
    collections: surnames,
    name: "surnames",
  },
];
module.exports = persons;
