const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    designation: {
      type: Number,
      required: true,
    },
    hos: {
      type: Number,
      required: true,
    },
    lastVisit: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["petition", "pending", "active", "banned", "suspended"],
        message: "{VALUE} is not supported",
      },
      default: "active",
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byUser = function (user) {
  return this.where({ user });
};

modelSchema.query.byBranch = function (branch) {
  return this.where({ branch });
};

const Entity = mongoose.model("Physicians", modelSchema);

module.exports = Entity;
