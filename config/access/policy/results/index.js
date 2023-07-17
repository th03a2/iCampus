const laboratory = require("./laboratory"),
  radiology = require("./radiology"),
  preferences = require("./preferences");

module.exports = {
  ...laboratory,
  ...radiology,
  preferences,
};
