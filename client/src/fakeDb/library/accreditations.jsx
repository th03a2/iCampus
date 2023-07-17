const laboratory = require("../json/accreditations/laboratory");
const radiology = require("../json/accreditations/Radiology");

export const Laboratory = {
  collection: laboratory.default,
  find: (pk) => laboratory.default.find(({ id }) => id === pk),
  whereIn: (cluster) =>
    laboratory.default.filter(({ id }) => cluster.includes(id)),
};

export const Radiology = {
  collection: radiology.default,
  find: (pk) => laboratory.default.find(({ id }) => id === pk),
  whereIn: (cluster) =>
    laboratory.default.filter(({ id }) => cluster.includes(id)),
};
export const Pharmacy = {
  collection: radiology.default,
  find: (pk) => laboratory.default.find(({ id }) => id === pk),
  whereIn: (cluster) =>
    laboratory.default.filter(({ id }) => cluster.includes(id)),
};
export const birthing = {
  collection: radiology.default,
  find: (pk) => laboratory.default.find(({ id }) => id === pk),
  whereIn: (cluster) =>
    laboratory.default.filter(({ id }) => cluster.includes(id)),
};
