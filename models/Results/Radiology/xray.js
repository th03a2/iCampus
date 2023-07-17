const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    packages: { type: String },
    findings: { type: String },
    source: { type: String },
    deletedAt: { type: String },
    case: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("xrays", modelSchema);

module.exports = Entity;
