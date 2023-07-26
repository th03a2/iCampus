const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    fname: { type: String },
    mname: { type: String },
    lname: { type: String },
    suffix: { type: String },
    dob: { type: Date },
    isMale: { type: Boolean },
    phone: { type: String },
    street: { type: String },
    brgy: { type: String },
    occupation: { type: String },
    muni: { type: String },
    province: { type: String },
    relationship: { type: String },

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

const Entity = mongoose.model("guardians", modelSchema);

module.exports = Entity;
