const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    saleId: { type: mongoose.Schema.Types.ObjectId, ref: "Disposals" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    qnty: { type: Number },
    up: { type: Number },
    hasDiscount: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.bySaleId = function (saleId) {
  return this.where({ saleId });
};
// products solds
const Entity = mongoose.model("Solds", modelSchema);

module.exports = Entity;
