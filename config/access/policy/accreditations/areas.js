const { public, elite, admin } = require("../../rights");

module.exports = {
  browse: public,
  save: elite,
  destroy: elite,
};
