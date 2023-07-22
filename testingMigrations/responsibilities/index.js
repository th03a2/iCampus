const Attendance = require("../../models/Responsibilities/Attendances"),
  attendances = require("./Attendance"),
  Temparature = require("../../models/Responsibilities/Monitorings/Temperatures"),
  temparature = require("./Temparature"),
  QC = require("../../models/Responsibilities/Qc"),
  qc = require("./Qc"),
  Laboratory = require("./Results/Laboratory"),
  Radiology = require("./Results/Radiology"),
  // preferences
  Tinio = require("./Results/Preference/tinio"),
  Carranglan = require("./Results/Preference/carranglan"),
  Vincent = require("./Results/Preference/saintVincent"),
  Preference = require("../../models/Results/Preference"),
  Access = require("../../models/Responsibilities/Access"),
  access = require("./Access");

const collections = [...Tinio, ...Carranglan, ...Vincent];

const liabilities = [
  // {
  //   entity: Attendance,
  //   collections: attendances,
  //   name: "attendances",
  // },
  ...Laboratory,
  ...Radiology,
  // {
  //   entity: Preference,
  //   collections,
  //   name: "preferences",
  // },
  // {
  //   entity: Temparature,
  //   collections: temparature,
  //   name: "temparature",
  // },
  // {
  //   entity: QC,
  //   collections: qc,
  //   name: "qcs",
  // },
  {
    entity: Access,
    collections: access,
    name: "accesses",
  },
];
module.exports = liabilities;
