const { restricted, public } = require("../../../rights");

module.exports = {
  browse: public,
  save: restricted,
  update: restricted,
};
