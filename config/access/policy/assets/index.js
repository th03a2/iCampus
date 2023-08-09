const persons = require("./persons"),
  companies = require("./companies"),
  schedulers = require("./schedulers"),
  sourcing = require("./sourcing");

module.exports = {
  ...persons,
  companies,
  schedulers,
  sourcing,
};
