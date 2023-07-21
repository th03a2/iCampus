const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byCompanyId = function (companyId) {
  return this.where({ companyId });
};
modelSchema.query.byCompanies = function (companies) {
  return this.where({ companyId: { $in: companies } });
};

const Entity = mongoose.model("books", modelSchema);

module.exports = Entity;
