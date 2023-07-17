const { restricted, public } = require("../../../rights");

module.exports = {
  archive: restricted,
  unresolved: restricted,
  update: restricted,
  restore: restricted,
  destroy: restricted,
  browse: public,
  save: restricted,
};
