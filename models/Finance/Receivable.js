const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    patronId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    soaId: { type: mongoose.Schema.Types.ObjectId, ref: "statements" },
    category: { type: Number },
    cheque: { type: String },
    amount: { type: Number },
    cashout: { type: Date },
    deposited: { type: String },
    has_paid: { type: Boolean },
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

const Entity = mongoose.model("receivables", modelSchema);

module.exports = Entity;
