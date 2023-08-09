const Companies = require("../../models/Assets/Companies"),
  companies = require("./companies"),
  Branches = require("../../models/Assets/Branches"),
  branches = require("./branches"),
  Procurements = require("../../models/Assets/Procurements"),
  procurements = require("./file201/procurements"),
  Sources = require("../../models/Assets/Sources"),
  Schedulers = require("../../models/Assets/Schedulers"),
  schedulers = require("./schedulers"),
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
  persons = require("./persons"),
  books = require("./books"),
  Books = require("../../models/Assets/Books"),
  subjects = require("./subjects"),
  Subjects = require("../../models/Assets/Subjects");
(batch = require("./Batch")), (Batch = require("../../models/Assets/Batch"));

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
    entity: Schedulers,
    collections: schedulers,
    name: "schedulers",
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
    entity: Books,
    collections: books,
    name: "books",
  },
  {
    entity: Subjects,
    collections: subjects,
    name: "subjects",
  },
  { entity: Banks, collections: banks, name: "banks" },
  {
    entity: Articles,
    collections: articles,
    name: "articles",
  },
  {
    entity: Batch,
    collections: batch,
    name: "batchs",
  },
];
module.exports = assets;
