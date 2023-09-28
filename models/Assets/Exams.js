const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    startDate: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endDate: {
      type: String,
    },
    endTime: {
      type: String,
    },
    levelId: {
      type: Number,
    },
    subjectId: {
      type: Number,
    },
    specification: {
      type: String,
    },
    title: {
      type: String,
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

const Entity = mongoose.model("Exams", modelSchema);

module.exports = Entity;
