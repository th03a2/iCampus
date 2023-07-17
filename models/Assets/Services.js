const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    id: { type: Number },
    preference: {
      type: String,
      enum: {
        values: ["equal", "gender", "development"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    ingridiens: { type: Array },
    deletedAt: { type: Number },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Services", modelSchema);

module.exports = Entity;
