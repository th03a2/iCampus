const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    packages: { type: Object }, // e.g.: {"84":0,"88":0}
    remarks: { type: String },
    // signatories: [performer, pathologist, encoder]
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

const Entity = mongoose.model("chemistries", modelSchema);

module.exports = Entity;
