const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: 0,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    hos: {
      type: Number,
    },
    hasPds: {
      type: Boolean,
      default: false,
    },
    hasResume: {
      type: Boolean,
      default: false,
    },
    hasLetter: {
      type: Boolean,
      default: false,
    },
    lastVisit: {
      type: Boolean,
      default: false,
    },
    platform: {
      type: String,
      default: "patron",
    },
    message: {
      type: String,
    },
    rate: {
      type: Number,
    },
    designation: {
      type: Number,
    },
    soe: {
      type: String,
    },
    //# already available on users name HEA: high educational attainment
    // eduAttainment: {
    //   type: String,
    //   // required: true,
    // },
    rate: {
      monthly: { type: Number },
      weekly: { type: Number },
      daily: { type: Number },
      pf: { type: Number },
    },
    status: {
      type: String,
      enum: {
        values: ["petition", "pending", "active", "banned", "suspended"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
    specifications: {
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

modelSchema.query.byUser = function (user) {
  return this.where({ user });
};

modelSchema.query.byBranch = function (branch) {
  return this.where({ branch });
};

const Entity = mongoose.model("Personnels", modelSchema);

module.exports = Entity;
