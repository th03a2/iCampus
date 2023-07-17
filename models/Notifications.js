const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Companies" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    icon: {
      type: String,
    },
    details: {
      type: String,
    },
    isRead: {
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

modelSchema.query.byUserId = function (userId) {
  return this.where({ userId });
};

const Entity = mongoose.model("Notifications", modelSchema);

module.exports = Entity;
