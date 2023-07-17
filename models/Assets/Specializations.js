const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    acronym: {
      type: String,
    },
    activity: { type: Array }, //
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
const Entity = mongoose.model("Specializations", modelSchema);

module.exports = Entity;
