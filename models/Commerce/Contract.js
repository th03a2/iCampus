const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    // binding category
    referral: { // Company
      type: String,
      enum: {
        values: ["refA", "refB", "refC"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    subcon: {
      type: String,
      enum: {
        values: ["scA", "scB", "scC", "csD", "csE"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    max: { type: Number }, // maximum charge of SOA
    cutoff: { type: Number }, // SOA cutoff
    payment: {
      type: String,
      enum: {
        values: ["prepaid", "postpaid"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    advance: { type: Number },
    status: { type: String },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.bySaleId = function (saleId) {
  return this.where({ saleId });
};

const Entity = mongoose.model("SaleItems", modelSchema);

module.exports = Entity;
