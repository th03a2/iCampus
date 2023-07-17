const roles = require("../json/roles");

export const Role = {
  collection: roles.default,
  find: (pk) => roles.default.find(({ id }) => id === pk),
  whereIn: (cluster) => roles.default.filter(({ id }) => cluster.includes(id)),
};
