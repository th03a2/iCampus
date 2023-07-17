const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    packages: { type: Array }, // [58, 59]
    cc: { type: Array }, // Cell count e.g.: [130,0.4,4.5,5]
    dc: { type: Object }, // diff count e.g.: {"a":55,"b":25,"c":6,"d":5,"e":5,"f":4}
    rci: { type: Array }, // Red cell indices e.g.: [99,31.1,314,12.8]
    apc: { type: Number }, // actual platelet count
    troupe: { type: Object }, // other Test e.g.: {"32":[2,3],"33":[4,3],"30":[0,0,0],"144":18,"140":45}
    remarks: { type: String },
    signatories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    hasDone: { type: Boolean }, // published when done
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};
const Entity = mongoose.model("hematologies", modelSchema);

module.exports = Entity;
