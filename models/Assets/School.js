const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Companies" },
    companyName: { type: String },
    code: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String },
    acronym: { type: String },
    stage: {
      jhs: { type: Array },
      shs: { type: Array },
    },
    address: {
      region: { type: String },
      province: { type: String },
      city: { type: String },
      barangay: { type: String },
      street: { type: String },
    },
    division: {
      type: String,
    },
    account: { type: Array, ref: "Users" },
    banner: { type: Array, ref: "Branches" },
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

const Entity = mongoose.model("schools", modelSchema);

module.exports = Entity;
