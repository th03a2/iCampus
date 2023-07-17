const { restricted } = require("../../../rights");

module.exports = {
  archive: restricted,
  unresolved: restricted,
  update: restricted,
  restore: restricted,
  destroy: restricted,
};
