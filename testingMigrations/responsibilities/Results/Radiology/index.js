// export { chemistry } from "./Chemistry";
// export { hematology } from "./Hematology";
// export { parasitology } from "./Parasitology";
// export { serology } from "./Serology";
// export { urinalysis } from "./Urinalysis";

const Ecg = require("../../../../models/Results/Radiology/ecg"),
  ecgs = require("./Ecg"),
  Ultrasound = require("../../../../models/Results/Radiology/ultrasound"),
  ultrasounds = require("./Ultrasounds"),
  Xray = require("../../../../models/Results/Radiology/xray"),
  xrays = require("./Xray");

const Radiology = [
  {
    entity: Ecg,
    collections: ecgs,
    name: "ecgs",
  },
  {
    entity: Ultrasound,
    collections: ultrasounds,
    name: "ultrasounds",
  },
  {
    entity: Xray,
    collections: xrays,
    name: "xrays",
  },
];

module.exports = Radiology;
