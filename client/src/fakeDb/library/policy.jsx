const policy = require("../json/policy.json");

export const Policy = {
  collection: policy,
  find: (pk) => policy.find(({ id }) => id === pk),
  departments: () => policy.filter(({ department }) => department),
  positions: (key) =>
    policy.find(({ department, positions }) => department === key && positions),
};
