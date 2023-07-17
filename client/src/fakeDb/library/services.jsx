const services = require("../json/services");

export const Services = {
  collection: services.default,
  find: pk => services.default.find(({ id }) => id === Number(pk)),
  getName: pk => services.default.find(({ id }) => id === Number(pk)).name,
  whereIn: cluster => services.default.filter(({ id }) => cluster.includes(id)),
  whereNotIn: cluster =>
    services.default.filter(({ id }) => !cluster.includes(id)),
};
