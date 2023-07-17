const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    in: {
      type: String,
      required: true,
    },
    lunchout: {
      type: String,
      required: true,
    },
    lunchin: {
      type: String,
      required: true,
    },
    out: {
      type: String,
      default: "",
    },
    total: { type: Number },
    ut: {
      // undertime
      type: String,
    },
    ot: {
      // overtime
      type: String,
    },
    approveBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    approvedAt: {
      type: String,
    },
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

modelSchema.query.byUser = function (user) {
  return this.where({ user });
};

const Entity = mongoose.model("Attendances", modelSchema);

module.exports = Entity;
