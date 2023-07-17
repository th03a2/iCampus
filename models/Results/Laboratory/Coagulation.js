const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    packages: { type: Array },
    pt: { type: Array },
    aptt: { type: Array },
    remarks: { type: String },
    signatories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    hasDone: { type: Boolean }, // published when done
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("coagulations", modelSchema);

module.exports = Entity;
