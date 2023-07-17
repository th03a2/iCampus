export const preference = {
  Male: {
    hct: {
      pvLo: 0.18, // need blood transfusion
      lo: 0.4,
      hi: 0.5,
      pvHi: 0.6, // Panic Value
      wLo: 0, //
      wHi: 0,
      unit: null,
    },
    hgb: { pvLo: 60, lo: 130, hi: 170, warn: 204, wLo: 0, wHi: 0, unit: "g/l" },
    rbc: {
      pvLo: 1.98,
      lo: 4.5,
      hi: 5,
      warn: 6.6,
      wLo: 0,
      wHi: 0,
      unit: "x10<sup>12</sup>/L",
    },
    wbc: {
      pvLo: 1,
      lo: 5,
      hi: 10,
      warn: 16,
      wLo: 0,
      wHi: 18,
      unit: "x10 <sup>9</sup>/l",
    },
  },
  Female: {
    hct: {
      pvLo: 0.18,
      lo: 0.36,
      hi: 0.44,
      pvHi: 0.6,
      wLo: 0,
      wHi: 0,
      unit: null,
    },
    hgb: { pvLo: 60, lo: 130, hi: 170, pvHi: 204, wLo: 0, wHi: 0, unit: "g/l" },
    rbc: {
      pvLo: 1.98,
      lo: 4.5,
      hi: 5,
      pvHi: 6.6,
      wLo: 0,
      wHi: 0,
      unit: "x10<sup>12</sup>/L",
    },
    wbc: {
      pvLo: 1,
      lo: 5,
      hi: 10,
      pvHi: 50,
      wLo: 0,
      wHi: 18,
      unit: "x10 <sup>9</sup>/l",
    },
  },
  plt: { pvLo: 20, lo: 150, hi: 450, pvHi: 1000, wHi: 700, wLo: 100 },
  differentials: {
    Segmenters: { pvLo: 20, lo: 55, hi: 65, pvHi: 80 },
    Lymphocytes: { pvLo: 20, lo: 25, hi: 35, pvHi: 50 },
    Monocytes: { pvLo: 0, lo: 2, hi: 6, pvHi: 20 },
    Eosinophils: { pvLo: 0, lo: 2, hi: 4, pvHi: 20 },
    Stabs: { pvLo: 0, lo: 0, hi: 5, pvHi: 20 },
    Basophils: { pvLo: 0, lo: 2, hi: 6, pvHi: 20 },
  },
  rci: {
    MCV: { lo: 76, hi: 96, unit: "fl" },
    MCH: { lo: 27, hi: 32, unit: "pg" },
    MCHC: { lo: 300, hi: 350, unit: "g/l" },
    RDWc: { lo: 11.0, hi: 15.0, unit: "%" },
  },
};

export const cellTitle = [
  "Hematocrit",
  "Hemoglobin",
  "Erythrocyte",
  "Leukocyte",
];
export const cellAbbr = ["hct", "hgb", "rbc", "wbc"];
export const differentialCategory = [
  "Segmenters",
  "Lymphocytes",
  "Monocytes",
  "Eosinophils",
  "Basophils",
  "Stabs",
];
export const formatDiffCount = value => {
  if (value) {
    const newValue = value / 100;
    return newValue.toFixed(2);
  }
  return null;
};
export const diffToArray = diff => {
  let values = [null, null, null, null, null, null];
  if (diff) {
    const alphabet = "abcdefg";
    const keys = Object.keys(diff);
    keys.map(key => (values[alphabet.indexOf(key)] = diff[key]));
  }
  return values;
};
export const diffToObject = diff => {
  const values = {};
  diff.map((key, index) => {
    if (key !== null) {
      const newKey = String.fromCharCode(97 + index);
      values[newKey] = key;
    }
  });
  return values;
};
export const rciCategory = ["MCV", "MCH", "MCHC", "RDWc"];

export const enquireAvailable = (value, stock) => {
  if (value + stock <= 100) {
    return parseInt(value);
  }
  return 100 - stock;
};
