const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    approved: {
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

modelSchema.query.approved = function (approved) {
  return this.where({ approved });
};

const Entity = mongoose.model("Surnames", modelSchema);

module.exports = Entity;
