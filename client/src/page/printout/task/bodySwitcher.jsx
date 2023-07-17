import {
  Hematology,
  Urinalysis,
  Chemistry,
  Parasitology,
  Coagulation,
  Serology,
  Miscellaneous,
  Analysis,
  Bacteriology,
  Compatibility,
  Pbs,
  PAPs,
  Blank,
  // SendOut,
  // ECG,
  // Xray,
} from "./body";

export const bodySwitcher = form => {
  switch (form) {
    case "hematology":
      return Hematology;
    case "urinalysis":
      return Urinalysis;
    case "chemistry":
      return Chemistry;
    case "parasitology":
      return Parasitology;
    case "coagulation":
      return Coagulation;
    case "serology":
      return Serology;
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
    case "PAPs":
      return PAPs;
    // case "sendOut":
    //   return SendOut;
    // case "ecg":
    //   return ECG;
    // case "xray":
    //   return Xray;
    default:
      return Blank;
  }
};
