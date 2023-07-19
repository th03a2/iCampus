const Companies = require("../../models/Assets/Companies"),
  companies = require("./companies"),
  Branches = require("../../models/Assets/Branches"),
  branches = require("./branches"),
  // Services = require("../../models/Assets/Services"),
  // services = require("./services"),
  Procurements = require("../../models/Assets/Procurements"),
  procurements = require("./file201/procurements"),
  Sources = require("../../models/Assets/Sources"),
  Levels = require("../../models/Assets/Level"),
  levels = require("./levels"),
  Specializations = require("../../models/Assets/Specializations"),
  specializations = require("./specialization"),
  Strands = require("../../models/Assets/Strands"),
  strands = require("./strand"),
  Sections = require("../../models/Assets/Sections"),
  sections = require("./sections"),
  Articles = require("../../models/Assets/Articles"),
  articles = require("./articles"),
  Banks = require("../../models/Assets/Banks"),
  banks = require("./banks"),
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
  {
    entity: Levels,
    collections: levels,
    name: "levels",
  },
  {
    entity: Sections,
    collections: sections,
    name: "sections",
  },
  {
    entity: Specializations,
    collections: specializations,
    name: "specializations",
  },
  {
    entity: Strands,
    collections: strands,
    name: "strands",
  },
  {
    entity: Banks,
    collections: banks,
    name: "banks",
  },
  {
    entity: Articles,
    collections: articles,
    name: "articles",
  },
];
module.exports = assets;
