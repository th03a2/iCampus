const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    product_id: { type: Number },
    purchase_item_id: { type: String },
    qnty: { type: Number },
    used: { type: Number },
    consume: { type: Number },
    lotNo: { type: Number },
    exp: { type: Number },
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

const Entity = mongoose.model("Inventories", modelSchema);

module.exports = Entity;
