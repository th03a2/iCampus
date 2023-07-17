const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Companies" },
    companyName: { type: String },
    ao: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String },
    acronym: { type: String },
    isMain: { type: Boolean, default: false },
    contacts: {
      mobile: { type: String },
      email: { type: String },
    },
    address: {
      region: { type: String },
      province: { type: String },
      city: { type: String },
      barangay: { type: String },
      street: { type: String },
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
      creditLimit: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      invoice: { type: String },
    },
    affiliated: { type: Array, ref: "Users" },
    vendors: { type: Array, ref: "Branches" },
    tieup: { type: Array, ref: "Branches" }, // vendors
    signatories: {
      type: Object,
      section: {
        type: String,
      },
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    },
    category: {
      type: String,
      enum: {
        values: ["elem", "jhs", "shs", "integrated"],
        message: "{VALUE} is not supported",
      },
      default: "integrated",
    },
    staff: { type: Object },
    settings: {},
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
