const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    cashierId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // select only one from source and referral
    source: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }, // from company
    referral: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }, // contract company
    physicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    classification: {
      type: String,
      enum: {
        values: [
          "walkin",
          "opd",
          "hmo",
          "cw",
          "pw",
          "er",
          "refA", // Referral Class A
          "refB", // Referral Class B
          "refC", // Referral Class C
          "scA", // Sub-con Class A
          "scB", // Sub-con Class B
          "scC", // Sub-con Class C
          "csD", // Sub-con Class D
          "csE", // Sub-con Class E
        ],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    payment: {
      type: String,
      enum: {
        values: ["cash", "cheque", "gcash", "credit", "free"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    amount: { type: Number },
    cash: { type: Number },
    discount: { type: Number },
    isPickup: {
      type: Boolean,
      default: true,
    },
    department: { type: String },
    authorizedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    renderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    renderedAt: { type: String },
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

modelSchema.query.byCustomerId = function (customerId) {
  return this.where({ customerId });
};

const Entity = mongoose.model("Disposals", modelSchema);

module.exports = Entity;
