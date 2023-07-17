const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // who will receive
    particular: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendors" },
    // utang
    liabilityId: { type: mongoose.Schema.Types.ObjectId, ref: "liabilities" },
    fsId: { type: mongoose.Schema.Types.ObjectId, ref: "statements" },
    category: { type: String },
    voucher: { type: String },
    cheque: { type: String },
    issue: { type: Date },
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    deposite: { type: Date },
    depositeBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    amount: { type: Number },
    isCash: { type: Boolean },
    breakdown: { type: Object },
    remarks: { type: String },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Payments", modelSchema);

module.exports = Entity;
