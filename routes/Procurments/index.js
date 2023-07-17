const Merchandise = require("./Merchandise");
const Purchase = require("./Purchase");
const procurments = {
  root: "procurements",
  branches: [
    {
      root: "merchandise",
      routes: Merchandise,
    },
    {
      root: "purchase",
      routes: Purchase,
    },
  ],
};

module.exports = procurments;
