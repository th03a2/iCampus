const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    name: {
      type: String,
    },
    subname: {
      type: String,
    },
    barcode: {
      type: String,
    },
    revert: {
      type: Boolean,
      default: false,
    },
    halt: {
      type: Boolean,
    },
    VATable: {
      type: Boolean,
      default: false,
    },
    packages: {
      type: Object,
    },
    conversion: {
      type: Object,
      default: false,
    },
    category: {
      type: String,
      default: false,
    },
    supplierObj: {
      type: String,
      default: false,
    },
    isUpload: {
      type: Boolean,
      default: false,
    },
    isConsumable: {
      type: Boolean,
      default: false,
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

const Entity = mongoose.model("Products", modelSchema);

module.exports = Entity;
