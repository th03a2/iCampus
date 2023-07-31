const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Companies" },
    principal: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    contacts: {
      mobile: { type: String },
      email: { type: String },
    },
    name: { type: String },
    category: {
      type: String,
      enum: {
        values: ["prep", "elementary", "jhs", "shs", "integrated"],
        message: "{VALUE} is not supported, please select appropriate options",
        default: "elementary",
      },
    },
    credentials: {
      tin: { type: String },
      classification: {
        type: String,
        enum: {
          values: ["primary", "secondary", "tertiary"],
          message:
            "{VALUE} is not supported, please select appropriate options",
        },
      },
      quota: { type: Number, default: 0 },
    },
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

const Entity = mongoose.model("Branches", modelSchema);

module.exports = Entity;
