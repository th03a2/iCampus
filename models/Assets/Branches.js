const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    levelId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    position: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      trim: true,
    },
    officers: {
      type: Array,
    },
    schedules: {
      type: Array,
      trim: true,
    },
    module: {
      type: Array,
      trim: true,
    },
    asgmt: {
      type: Array,
      trim: true,
    },
    issues: {
      type: Array,
      trim: true,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("branches", modelSchema);

module.exports = Entity;
