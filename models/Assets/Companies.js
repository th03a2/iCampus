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
    address: {
      region: { type: String },
      province: { type: String },
      city: { type: String },
      barangay: { type: String },
      street: { type: String },
    },
    tagline: {
      type: String,
      trim: true,
    },
    schoolId: {
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
