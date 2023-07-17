export const formatToSIValue = (value, service) => {
  let converted;
  const _value = value ? value : 0;
  switch (service) {
    case "FASTING BLOOD SUGAR":
      converted = _value * 0.055; // convention factors
      break;
    case "CHOLESTEROL":
    case "HDL-Cholesterol":
    case "LDL-Cholesterol":
    case "VERY LOW DENSITY LIPOPROTEIN":
      converted = _value * 0.026;
      break;
    case "TRIGLYCERIDES":
      converted = _value * 0.011;
      break;
    case "CREATININE":
      converted = _value * 88.4;
      break;
    case "BLOOD URIC ACID":
      converted = _value * 0.059;
      break;
    case "BLOOD UREA NITROGEN":
      converted = _value * 0.357;
      break;
    default:
      //  "ALANINE AMINOTRANSFERASE"
      converted = _value;
  }

  return converted > 15
    ? Number.parseInt(converted)
    : converted > 10
    ? Number.parseFloat(converted).toFixed(1)
    : Number.parseFloat(converted).toFixed(2);
};
export const formatToSIUnits = service => {
  switch (service) {
    case "FASTING BLOOD SUGAR":
    case "CHOLESTEROL":
    case "HDL-Cholesterol":
    case "LDL-Cholesterol":
    case "TRIGLYCERIDES":
    case "VERY LOW DENSITY LIPOPROTIEN":
    case "BLOOD URIC ACID":
    case "BLOOD UREA NITROGEN":
      return "mmol/L";
    case "CREATININE":
      return "umol/l";
    case "ALANINE AMINOTRANSFERASE":
    case "ASPARTATE AMINOTRANSFERASE":
      return "U/L";
    case "GLYCOSYLATED HEMOGLOBIN":
      return "%";
    default:
      return null;
  }
};

const sections = [
  "Chemistry",
  "Hematology",
  "Urinalysis",
  "Analysis",
  "Parasitology",
  "Bacteriology",
  "Compatibility",
  "Coagulation",
  "PBS",
  "PAPs",
  "Miscellaneous",
  "Serology",
  "Biopsy",
  "ECG",
  "2DEcho",
  "Ultrasound",
  "X-ray",
];

export const convertToFormString = index => sections[index];
export const specialForms = ["sendout", "miscellaneous", "xray"]; // outsource
export const forms = [
  // Laboratory Department
  "analysis", // forms
  "bacteriology",
  "biopsy", // forms
  "chemistry",
  "coagulation",
  "compatibility", // forms
  "hematology",
  "miscellaneous", // special (must check the length)
  "parasitology",
  "pbs",
  "paps", // forms | 10
  "serology",
  "urinalysis",
  // Radiology Department
  "ecg", // 13
  "2DEcho",
  "ultrasound",
  "xray", // 16
];
export const formColors = form => {
  switch (form) {
    case "serology":
    case "miscellaneous":
      return "light";
    case "urinalysis":
      return "warning";
    case "parasitology":
      return "success";
    case "hematology":
    case "coagulation":
      return "danger";
    default:
      return "primary";
  }
};
export const sourceColors = source => {
  switch (source) {
    case "hmo":
      return "info";
    case "cw":
      return "warning";
    case "pw":
      return "success";
    case "er":
      return "danger";
    default:
      return "primary";
  }
};
export const Department = {
  radiology: ["ecg", "2DEcho", "xray"],
  laboratory: [
    "chemistry",
    "hematology",
    "urinalysis",
    "analysis",
    "parasitology",
    "bacteriology",
    "compatibility",
    "coagulation",
    "pbs",
    "biopsy",
    "paps",
    "serology",
    "miscellaneous",
  ],
};
export const units = [
  null,
  "mg/dl",
  "U/L",
  "ng/ml",
  "mIU/L",
  "IU/L",
  "UIU/ML",
  "pmol/L",
  "nmol/L",
  "g/dl",
];
export const aboArray = ["A", "B", "O", "AB"];
export const sec = ["00", "15", "30", "45"];
export const urineColors = [
  "Very Light Yellow",
  "Light Yellow",
  "Yellow",
  "Dark Yellow",
  "Reddish Yellow",
  "Orange",
  "Amber",
];
export const transparency = ["Clear", "Slightly Turbid", "Turbid"];
export const resultInRange = ["Negative", "Trace", "+1", "+2", "+3", "+4"];
export const bacteriaInRange = ["+1", "+2", "+3", "+4"];
export const resultInBool = ["Negative", "Positive"];
export const ph = ["5.0", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5"];
export const specificGravity = [
  "1.005",
  "1.010",
  "1.015",
  "1.020",
  "1.025",
  "1.030",
];
export const microscopicInRange = [
  "0-1/hpf",
  "0-2/hpf",
  "1-3/hpf",
  "2-4/hpf",
  "3-5/hpf",
  "4-6/hpf",
  "6-8/hpf",
  "8-10/hpf",
  "10-15/hpf",
  "15-20/hpf",
  "20-25/hpf",
  "25-30/hpf",
  "30-40/hpf",
  "40-50/hpf",
  "60-80/hpf",
  "> 100/hpf",
];
export const microscopicResultInWord = ["RARE", "FEW", "MODERATE", "PLENTY"];

export const fecalColor = [
  "Dark Brown",
  "Brown",
  "Light Brown",
  "Yellow",
  "Reddish",
  "Greenish",
  "Gray",
];
export const consistency = [
  "Formed",
  "Semi-Formed",
  "Soft",
  "Watery",
  "Mucoid",
  "Watery Mucoid",
];

export const vldl = {
  id: 42,
  hi: 0,
  lo: 0,
  pvHi: 0,
  pvLo: 0,
  result: null,
  service: {
    id: 42,
    description: "VERY LOW DENSITY LIPOPROTEIN",
    abbreviation: "VLDL",
  },
  units: "mg/dl",
  warn: 0,
};
export const choleHDLratio = {
  id: 43,
  hi: 4.52,
  lo: 0,
  pvHi: 0,
  pvLo: 0,
  result: null,
  service: {
    id: 43,
    description: "Chole/HDL Ratio",
    abbreviation: "CH Ratio",
  },
  units: null,
  warn: 0,
};

export const preferences = {
  gender: ["Female", "Male"],
  development: [
    "Newborn",
    "Infant",
    "Toddler",
    "Child",
    "Teen ager",
    "Early Adult",
    "Young Adult",
    "Adult",
    "Geriatric",
  ],
};
