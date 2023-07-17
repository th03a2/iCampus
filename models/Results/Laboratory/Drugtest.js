const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    packages: { type: Array },
    vt: { type: String }, // QL093098 41 // auto-generated
    ccf: { type: String }, // 202307070008 // 2023-07-07-0008 // yr-month-day-number of patient
    method: { type: String }, // Test Kit
    purpose: { type: String }, // Private Employment
    company: { type: String }, // Jollibee
    met: { type: Boolean }, // { result: negative }
    thc: { type: Boolean }, // { result: negative }
    remarks: { type: String },
    signatories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }], // [Analyst, Head of Laboratory]
    hasDone: { type: Boolean },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("drugtests", modelSchema);

module.exports = Entity;
