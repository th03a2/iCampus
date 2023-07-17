const persons = require("./persons"),
  companies = require("./companies"),
  sourcing = require("./sourcing");

module.exports = {
  ...persons,
  companies,
  sourcing,
};
