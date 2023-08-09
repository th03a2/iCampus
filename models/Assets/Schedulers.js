const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batches",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    prof: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections",
    },
    level: { type: Number },
    subject: { type: Number },
    room: { type: String },
    startAt: { type: String },
    endAt: { type: String },
    program: { type: Object },
    status: {
      type: String,
      enum: {
        values: ["pending", "done", "onprocess"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byCompanyId = function (companyId) {
  return this.where({ companyId });
};
modelSchema.query.byCompanies = function (companies) {
  return this.where({ companyId: { $in: companies } });
};

const Entity = mongoose.model("schedulers", modelSchema);

module.exports = Entity;
