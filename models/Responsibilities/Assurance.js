const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
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
