const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    expected: { type: String },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // Drugs, Food, Materials
    approved: { type: String },
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    received: { type: String },
    deliverBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    liabilityId: { type: mongoose.Schema.Types.ObjectId, ref: "Liabilities" },
    approvedQty: { type: Number }, //approved quantity
    amount: { type: Number },
    remarks: { type: String },
    response: { type: String },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "cancel", "denied", "received"],
        message: "{VALUE} is not supported",
      },
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

modelSchema.query.byUserId = function (userId) {
  return this.where({ userId });
};

const Entity = mongoose.model("Purchases", modelSchema);
// Purchase Items will called stocks
module.exports = Entity;
