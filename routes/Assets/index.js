const Companies = require("./Companies");
const Branches = require("./Branches");
const Sources = require("./Sources");
const Persons = require("./Persons");
const File201 = require("./file201");
const Levels = require("./Levels");
const Sections = require("./Sections");
const Strands = require("./Strands");
const Specializations = require("./Specializations");
const Books = require("./Books");
const Subjects = require("./Subjects");
const Banks = require("./Banks");
const Articles = require("./Articles");

const assets = {
  root: "assets",
  branches: [
    {
      root: "companies",
      routes: Companies,
    },
    {
      root: "branches",
      routes: Branches,
    },
    {
      root: "sources",
      routes: Sources,
    },
    {
      root: "persons",
      children: Persons,
    },
    {
      root: "file201",
      children: File201,
    },
    {
      root: "levels",
      routes: Levels,
    },
    {
      root: "Sections",
      routes: Sections,
    },
    {
      root: "Strands",
      routes: Strands,
    },
    {
      root: "specializations",
      routes: Specializations,
    },
    {
      root: "books",
      routes: Books,
    },
    {
      root: "subjects",
      routes: Subjects,
    },
    {
      root: "banks",
      routes: Banks,
    },
    {
      root: "articles",
      routes: Articles,
    },
  ],
};

module.exports = assets;
