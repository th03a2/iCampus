const Sales = require("./Sales"),
  Menus = require("./Menus"),
  Merchandise = require("./Merchandise"),
  Items = require("./SalesItems");

const commerce = {
  root: "commerce",
  branches: [
    {
      root: "sales",
      routes: Sales,
    },
    {
      root: "menus",
      routes: Menus,
    },
    {
      root: "merchandise",
      children: Merchandise,
    },
    {
      root: "items",
      routes: Items,
    },
  ],
};

module.exports = commerce;
