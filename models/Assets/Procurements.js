const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    model: { type: String },
    brand: { type: String },
    descriptions: { type: String },
    serial: { type: String },
    //date of Purchase
    dop: { type: String },
    mortgage: { type: Number },
    depreciation: {
      type: Number,
    },
    accuqired: {
      type: String,
      enum: {
        values: ["brand-new", "refurbish"],
        message: "{VALUE} is not supported",
      },
      default: "refurbish",
    },
    status: {
      type: String,
      enum: {
        values: ["fully functional", "functional", "damaged", "broken"],
        message: "{VALUE} is not supported",
      },
      default: "fully functional",
    },
    category: {
      type: String,
      enum: {
        values: ["furniture", "machines"],
        message: "{VALUE} is not supported",
      },
      default: "furniture",
    },
    price: {
      type: Number,
      default: false,
    },
    // number of days waranty
    waranty: {
      type: Number,
      default: false,
    },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};
modelSchema.query.byUser = function (user) {
  return this.where({ user });
};
const Entity = mongoose.model("Procurements", modelSchema);

module.exports = Entity;
