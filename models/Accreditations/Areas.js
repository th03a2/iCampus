const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    tools: { type: String }, // organization
    criteria: { type: String }, // 1
    indicator: { type: String }, // 0.pdf
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = (branchId) => this.where({ branchId });

const Entity = mongoose.model("Areas", modelSchema);

module.exports = Entity;
