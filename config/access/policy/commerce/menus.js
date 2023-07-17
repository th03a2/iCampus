const { restricted, public, admin } = require("../../rights");

module.exports = {
  browse: public,
  save: restricted,
  update: restricted,
  delete: admin,
};
