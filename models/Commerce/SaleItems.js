const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    saleId: { type: mongoose.Schema.Types.ObjectId, ref: "Sales" },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menus" },
    up: { type: Number },
    discountable: {
      type: Boolean,
      default: false,
    },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" }, // Subcontract
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.bySaleId = function (saleId) {
  return this.where({ saleId });
};

const Entity = mongoose.model("SaleItems", modelSchema);

module.exports = Entity;
