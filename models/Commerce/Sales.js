const mongoose = require("mongoose");
const Chemistry = require("../Results/Laboratory/Chemistry");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    cashierId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    physicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // vendor price, either charge to company or special price
    source: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    subcon: { type: mongoose.Schema.Types.ObjectId, ref: "Sales" }, // prof of transactions
    // vp, sc & ssc are all credit
    // vp:vendor price
    // subcon
    // special subcon
    category: {
      type: String,
      enum: {
        values: ["walkin", "opd", "hmo", "cw", "pw", "er", "vp", "sc", "ssc"],
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
    // in whole number
    discount: { type: Number },
    isPickup: {
      type: Boolean,
      default: true,
    },
    department: {
      type: String,
      enum: {
        values: ["laboratory", "radiology", "pharmacy"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    hasResult: {
      type: Boolean,
      default: false,
    },
    hasArrived: {
      type: Boolean,
      default: false,
    },
    authorizedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    renderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    renderedAt: { type: String },
    ssx: { type: String }, // signs and symptoms
    or: { type: String },
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
modelSchema.query.byPhysicianId = function (physicianId) {
  return this.where({ physicianId });
};
modelSchema.query.bySource = function (source) {
  return this.where({ source });
};
modelSchema.query.bySubcon = function (subcon) {
  return this.where({ subcon });
};

const Entity = mongoose.model("Sales", modelSchema);

module.exports = Entity;
