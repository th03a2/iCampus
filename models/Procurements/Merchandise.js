const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    purchase: { type: mongoose.Schema.Types.ObjectId, ref: "Purchase" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    quantity: {
      request: {
        type: Number,
        default: 1,
      },
      approved: {
        type: Number,
        default: 0,
      },
    },
    amount: { type: Number },
    status: {
      type: Boolean, //consume vs available
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byPurchase = function (purchase) {
  return this.where({ purchase });
};

const Entity = mongoose.model("Merchandise", modelSchema);
// Purchase Items will called stocks
module.exports = Entity;
