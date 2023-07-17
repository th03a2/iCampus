const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    vendors: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    clients: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    ao: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subName: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ["hmo", "sc", "ssc"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Sources", modelSchema);

module.exports = Entity;
