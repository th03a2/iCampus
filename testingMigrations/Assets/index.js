const Companies = require("../../models/Assets/Companies"),
  companies = require("./companies"),
  Branches = require("../../models/Assets/Branches"),
  branches = require("./branches"),
  // Services = require("../../models/Assets/Services"),
  // services = require("./services"),
  Procurements = require("../../models/Assets/Procurements"),
  procurements = require("./file201/procurements"),
  Sources = require("../../models/Assets/Sources"),
  sources = require("./sources"),
  persons = require("./persons");

const assets = [
  ...persons,
  {
    entity: Companies,
    collections: companies,
    name: "companies",
  },
  {
    entity: Branches,
    collections: branches,
    name: "branches",
  },
  {
    entity: Sources,
    collections: sources,
    name: "sources",
  },
  // {
  //   entity: Services,
  //   collections: services,
  //   name: "services",
  // },
  {
    entity: Procurements,
    collections: procurements,
    name: "procurements",
  },
];
module.exports = assets;
