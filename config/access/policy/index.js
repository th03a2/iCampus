const accreditations = require("./accreditations"),
  assets = require("./assets"),
  results = require("./results"),
  commerce = require("./commerce");

module.exports = {
  ...accreditations,
  ...assets,
  ...results,
  ...commerce,
};
