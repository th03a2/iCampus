const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    serviceId: { type: Number },
    // References
    isMale: { type: Boolean },
    development: { type: Number },
    // development: {
    //   type: String,
    //   enum: {
    //     values: ["newborn", "infant", "child", "teen", "early adult", "adult"],
    //     message: "{VALUE} is not supported",
    //   },
    // },
    age: { type: Number },
    // values
    lo: { type: Number }, // Low
    hi: { type: Number }, // high
    units: { type: String },
    warn: { type: Number }, // Warning
    pvLo: { type: Number }, // Panic Value Low
    pvHi: { type: Number }, // Panic Value High
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

modelSchema.query.byServiceId = function (serviceId) {
  return this.where({ serviceId });
};

const Entity = mongoose.model("preferences", modelSchema);
module.exports = Entity;
