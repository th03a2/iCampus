const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    physicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    case: { type: String },
    source: {
      type: String,
      enum: {
        values: [
          "walkin", // er
          "referrals",
          "transfer",
        ],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    category: {
      type: String,
      enum: {
        values: ["walkIn", "referrals"],
        message: "{VALUE} is not supported, please select appropriate options",
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

const Admissions = mongoose.model("Admissions", userSchema);

module.exports = Admissions;
