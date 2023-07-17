const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Procurements",
      required: true,
    },
    engineer: {
      type: String,
    },
    purpose: {
      type: String,
    },
    recommendations: {
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

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Maintenance", modelSchema);

module.exports = Entity;

// old

// brand: {
//   type: String,
// },
// model: {
//   type: String,
// },
// section: {
//   type: String,
// },
// price: {
//   type: Number,
// },
// serialNum: {
//   type: String,
//   default: false,
// },
// mortgage: {
//   type: Number,
//   default: false,
// },
// depreciation: {
//   type: Number,
//   default: false,
// },
// remerks: {
//   type: String,
//   default: false,
// },
