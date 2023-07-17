const statement = require("../json/statement");

export const Statement = {
  collection: statement.default,
  find: pk => statement.default.find(({ id }) => id === Number(pk)),
  whereIn: cluster =>
    statement.default.filter(({ id }) => cluster.includes(id)),
  whereNotIn: cluster =>
    statement.default.filter(({ id }) => !cluster.includes(id)),
  category: liabilities =>
    statement.default.filter(({ category }) => category === liabilities),
};
