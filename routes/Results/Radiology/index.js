const Ecg = require("./Ecg");
const Ultrasound = require("./Ultrasound");
const Xray = require("./Xray");

const radiology = [
  {
    root: "ecg",
    routes: Ecg,
  },
  {
    root: "ultrasound",
    routes: Ultrasound,
  },
  {
    root: "xray",
    routes: Xray,
  },
];

module.exports = radiology;
