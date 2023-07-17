const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Tasks", modelSchema);

module.exports = Entity;
