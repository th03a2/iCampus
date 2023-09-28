const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banks",
    },
    points: {
      type: Number,
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

const Entity = mongoose.model("Questions", modelSchema);

module.exports = Entity;
