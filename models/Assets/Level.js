const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    stage: { type: String },
    name: { type: String },
    description: { type: String },
    lvl: { type: String },

    deletedAt: { type: String },
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

const Entity = mongoose.model("levels", modelSchema);

module.exports = Entity;
