const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    packages: { type: Array },
    pe: { type: Array }, // Physical exam e.g.: [3,3]
    ce: { type: Array }, // Chemical exam e.g.: [0,0]
    me: { type: Array }, // Microscopic exam e.g.: [0,0,2,null,null]
    report: { type: String },
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

const Entity = mongoose.model("parasitologies", modelSchema);

module.exports = Entity;
