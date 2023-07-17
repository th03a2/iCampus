const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    category: {
      type: String,
      enum: {
        values: ["pre-analytical", "analytical", "miscelanious", "monthly"],
        message: "{VALUE} is not supported",
      },
      default: "monthly",
    },
    amount: { type: Number },
    posted: { type: String },
    remarks: { type: String },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Expenses", modelSchema);

module.exports = Entity;
