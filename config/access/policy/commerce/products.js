const { restricted, public, admin } = require("../../rights");

module.exports = {
  browse: public,
  save: restricted,
  update: restricted,
  destroy: admin,
};
