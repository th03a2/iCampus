const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
    semester: { type: Number },
    stages: { type: String },
    SY: { type: String },
    e_start: { type: String }, //enrollment start
    e_end: { type: String }, //enrollment end
    c_start: { type: String }, //class start
    c_end: { type: String }, //class end
    status: { type: String },
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

const Entity = mongoose.model("batchs", modelSchema);

module.exports = Entity;
