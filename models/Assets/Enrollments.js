const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batches",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Levels",
    },
    assessedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    units: { type: String },
    attachments: { type: Array },
    subjects: { type: Array },
    phone: { type: String }, //
    issues: { type: Array }, //
    miscellaneous: { type: Object }, //
    status: {
      type: String,
      enum: {
        values: ["pending", "active", "denied", "onprogress"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    }, //
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("enrollments", modelSchema);

module.exports = Entity;
