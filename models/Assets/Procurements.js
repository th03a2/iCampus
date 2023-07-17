const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      required: true,
    },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    studentsArr: {
      type: Array,
    },

    accumulate: { type: String },
    category: {
      type: String,
      enum: {
        values: ["furniture", "machines"],
        message: "{VALUE} is not supported",
      },
      default: "furniture",
    },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};
modelSchema.query.byUser = function (user) {
  return this.where({ user });
};
const Entity = mongoose.model("procurements", modelSchema);

module.exports = Entity;
