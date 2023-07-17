const Areas = require("./Areas");
const Indicators = require("./Indicators");
const Parameters = require("./Parameters");

const accreditations = {
  root: "accreditations",
  branches: [
    {
      root: "areas",
      routes: Areas,
    },
    {
      root: "indicators",
      routes: Indicators,
    },
    {
      root: "parameters",
      routes: require("./Parameters"),
    },
  ],
};

module.exports = accreditations;
