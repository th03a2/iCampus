const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // who will receive
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    particular: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // Purpose
    fsId: { type: Number },
    amount: { type: Number },
    due: { type: Date },
    range: { type: Array },
    isCash: { type: Boolean },
    deposited: { type: String },
    paid: { type: Date },
    remarks: { type: String },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranch = function (branchId) {
  return this.where({ branchId });
};
modelSchema.query.byUser = function (userId) {
  return this.where({ userId });
};
const Entity = mongoose.model("liabilities", modelSchema);

module.exports = Entity;
