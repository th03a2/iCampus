// export { chemistry } from "./Chemistry";
// export { hematology } from "./Hematology";
// export { parasitology } from "./Parasitology";
// export { serology } from "./Serology";
// export { urinalysis } from "./Urinalysis";

const Chemistry = require("../../../../models/Results/Laboratory/Chemistry"),
  chemistries = require("./Chemistry"),
  Drugtest = require("../../../../models/Results/Laboratory/Drugtest"),
  drugtests = require("./Drugtest"),
  Hematology = require("../../../../models/Results/Laboratory/Hematology"),
  hematologies = require("./Hematology"),
  Miscellaneous = require("../../../../models/Results/Laboratory/Miscellaneous"),
  miscellaneous = require("./Miscellaneous"),
  Parasitology = require("../../../../models/Results/Laboratory/Fecalysis"),
  parasitologies = require("./Fecalysis"),
  Serology = require("../../../../models/Results/Laboratory/Serology"),
  serologies = require("./Serology"),
  Urinalysis = require("../../../../models/Results/Laboratory/Urinalysis"),
  urinalyses = require("./Urinalysis"),
  Coagulation = require("../../../../models/Results/Laboratory/Coagulation"),
  coagulation = require("./Coagulation"),
  Pbs = require("../../../../models/Results/Laboratory/Pbs"),
  pbs = require("./Pbs");
// Outsource = require("../../../../models/Results/Laboratory/outsource"),
// outsources = require("./Outsources");

const laboratory = [
  {
    entity: Chemistry, // done
    collections: chemistries,
    name: "chemistries",
  },

  {
    entity: Drugtest,
    collections: drugtests,
    name: "drugtests",
  },

  {
    entity: Hematology, // done
    collections: hematologies,
    name: "hematologies",
  },
  {
    entity: Miscellaneous, // partially done
    collections: miscellaneous,
    name: "miscellaneouses",
  },
  {
    entity: Parasitology, // done
    collections: parasitologies,
    name: "parasitologies",
  },
  {
    entity: Serology, // done
    collections: serologies,
    name: "serologies",
  },
  {
    entity: Urinalysis, // done
    collections: urinalyses,
    name: "urinalyses",
  },
  {
    entity: Coagulation, // done
    collections: coagulation,
    name: "coagulations",
  },
  {
    entity: Pbs,
    collections: pbs,
    name: "pbs",
  },
  // {
  //   // entity: Outsource,
  //   collections: outsources,
  //   name: "outsources",
  // },
];

module.exports = laboratory;
