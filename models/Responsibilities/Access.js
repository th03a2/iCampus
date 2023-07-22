const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    platform: {
      type: String,
    },
    comment: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
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

const Entity = mongoose.model("Access", modelSchema);

module.exports = Entity;
