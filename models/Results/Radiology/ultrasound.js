const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

    packages: { type: String },
    Report: { type: String },
    source: { type: String },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Ultrasounds", modelSchema);

module.exports = Entity;
