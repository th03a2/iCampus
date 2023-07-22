const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      // required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    name: { type: String },
    // category: {
    //   type: String,
    //   enum: {
    //     values: ["brand-new", "refurbish"],
    //     message: "{VALUE} is not supported",
    //   },
    //   default: "refurbish",
    // },
    levelId: { type: Number },
    accumulate: { type: String }, //
    studenArr: { type: Array }, //
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};
modelSchema.query.byUser = function (user) {
  return this.where({ user });
};
const Entity = mongoose.model("sections", modelSchema);

module.exports = Entity;
