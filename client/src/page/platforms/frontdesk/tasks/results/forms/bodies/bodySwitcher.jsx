import {
  Hematology,
  Urinalysis,
  Chemistry,
  Drugtest,
  Parasitology,
  Coagulation,
  Serology,
  Miscellaneous,
  Analysis,
  Bacteriology,
  Compatibility,
  Pbs,
  // PAPs,
  // ECG,
  // Xray,
  Blank,
} from ".";

export const bodySwitcher = form => {
  switch (form) {
    case "hematology":
      return Hematology;
    case "urinalysis":
      return Urinalysis;
    case "chemistry":
      return Chemistry;
    case "drugtest":
      return Drugtest;
    case "serology":
      return Serology;
    case "parasitology":
      return Parasitology;
    case "coagulation":
      return Coagulation;
    case "miscellaneous":
      return Miscellaneous;
    case "analysis":
      return Analysis;
    case "bacteriology":
      return Bacteriology;
    case "compatibility":
      return Compatibility;
    case "pbs":
      return Pbs;
    // case "PAPs":
    //   return PAPs;
    // case "ecg":
    //   return ECG;
    // case "xray":
    //   return Xray;
    default:
      return Blank;
  }
};
