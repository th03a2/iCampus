const Qc = require("./Qc");
const Maintenance = require("./Maintenance");
const Access = require("./Access");
const responsibilities = {
  root: "responsibilities",
  branches: [
    {
      root: "qc",
      routes: Qc,
    },
    {
      root: "maintenance",
      routes: Maintenance,
    },
    {
      root: "access",
      routes: Access,
    },
  ],
};

module.exports = responsibilities;
