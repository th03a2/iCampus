const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Logs", modelSchema);

module.exports = Entity;
