const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batchs",
      required: true,
    },
    adviser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    name: { type: String },
    specification: { type: String },
    levelId: { type: Number },
    accumulate: { type: String }, //
    studenArr: { type: Array }, // students.length/accumulate
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
const Entity = mongoose.model("sections", modelSchema);

module.exports = Entity;
