const { public, restricted } = require("../../../rights");

module.exports = {
  browse: public,
  archive: restricted,
  find: public,
  update: public,
  restore: restricted,
  destroy: restricted,
};
