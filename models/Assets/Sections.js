const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batchs",
      // required: true,
    },

    adviser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    name: { type: String },
    specification: { type: String },
    levelId: { type: Number },
    accumulate: { type: String }, //
    studenArr: { type: Array }, //
    deletedAt: { type: String },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users",
    // },
    // category: {
    //   type: String,
    //   enum: {
    //     values: ["brand-new", "refurbish"],
    //     message: "{VALUE} is not supported",
    //   },
    //   default: "refurbish",
    // },
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
