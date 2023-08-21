const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    status: { type: String, default: "pending" },
    position: { type: String },
    designation: { type: String },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
modelSchema.query.byBranch = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Employees", modelSchema);

module.exports = Entity;
