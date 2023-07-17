const { restricted, public } = require("../../../rights");

module.exports = {
  save: restricted,
  browse: public,
};
