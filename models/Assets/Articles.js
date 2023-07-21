const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    avatar: { type: String },
    title: { type: String },
    message: { type: String },
    startAt: { type: Date }, //
    endAt: { type: Date }, //
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

const Entity = mongoose.model("articles", modelSchema);

module.exports = Entity;
