const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    ceo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    acronym: { type: String },
    subName: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: [
          "supplier",
          "laboratory",
          "outsource",
          "insource",
          "support",
          "clinic",
          "infirmary",
        ],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    tagline: {
      type: String,
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

const Entity = mongoose.model("Companies", modelSchema);

module.exports = Entity;
