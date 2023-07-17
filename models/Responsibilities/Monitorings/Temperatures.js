const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    PmRef: {
      type: Number,
    },
    AmRef: {
      type: Number,
    },
    AmRoom: {
      type: Number,
    },
    PmRoom: {
      type: Number,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byUserId = function (userId) {
  return this.where({ userId });
};

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};
const Entity = mongoose.model("Temperatures", modelSchema);

module.exports = Entity;
