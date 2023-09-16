const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    testNum: {
      type: Number,
    },
    category: {
      type: String,
      enum: {
        values: ["quiz", "periodical", "activity", "pretest", "posttest"], //pending, approved,denied,missing documents
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },

    gp: {
      //grading period
      type: Array,
      enum: {
        values: [1, 2, 3, 4], //pending, approved,denied,missing documents
        message: "{VALUE} is not supported, please select appropriate options",
      },
    }, //
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
const Entity = mongoose.model("strands", modelSchema);

module.exports = Entity;
