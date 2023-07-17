const { public, elite, admin } = require("../../rights");

module.exports = {
  browse: public,
  archive: admin,
  save: elite,
  destroy: elite,
};
