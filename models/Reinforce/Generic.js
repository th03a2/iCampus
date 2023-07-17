const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: { type: String },
    subname: { type: String },
    classifications: { type: String }, // Drugs, Food, Materials
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "halt", "banned"],
        message: "{VALUE} is not supported",
      },
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Generics", modelSchema);

module.exports = Entity;
