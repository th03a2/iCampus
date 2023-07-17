const temparature = require("./Temperatures");
const monitorings = {
  root: "monitorings",
  branches: [
    {
      root: "temperatures",
      routes: temparature,
    },
  ],
};

module.exports = monitorings;
