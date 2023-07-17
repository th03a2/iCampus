const laboratory = require("./Laboratory");
const radiology = require("./Radiology");
const preferences = require("./Preferences");

const task = {
  root: "results",
  branches: [
    {
      root: "laboratory",
      children: laboratory,
    },
    {
      root: "radiology",
      children: radiology,
    },
    {
      root: "preferences",
      routes: preferences,
    },
  ],
};

module.exports = task;
