const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    department: {
      type: String,
      enum: {
        values: ["laboratory", "radiology"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    section: {
      type: String,
      enum: {
        values: [
          "pathologist",
          "analysis",
          "bacteriology",
          "biopsy",
          "chemistry",
          "coagulation",
          "compatibility",
          "drugtest",
          "hematology",
          "miscellaneous",
          "parasitology",
          "paps",
          "pbs",
          "serology",
          "urinalysis",
          "ecg",
          "ultrasound",
          "xray",
          "2decho",
          "radiologist",
        ],
        message: "{VALUE} is not supported",
      },
      default: "active",
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byUser = function (user) {
  return this.where({ user });
};

modelSchema.query.byBranch = function (branch) {
  return this.where({ branch });
};

const Entity = mongoose.model("Heads", modelSchema);

module.exports = Entity;
