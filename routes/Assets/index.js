const Companies = require("./Companies");
const Branches = require("./Branches");
const Sources = require("./Sources");
const Persons = require("./Persons");
const File201 = require("./file201");

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
  ],
};

module.exports = assets;
