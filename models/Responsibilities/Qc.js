const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    serviceId: { type: Number },
    abnormal: { type: Number },
    high: { type: Number },
    normal: { type: Number },
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

modelSchema.query.byServiceId = function (serviceId) {
  return this.where({ serviceId });
};

const Entity = mongoose.model("Qc", modelSchema);

module.exports = Entity;
