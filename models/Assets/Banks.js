const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      // required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
      // required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    type: {
      type: String,
      enum: {
        values: ["mc", "essay", "enum", "boolean"], // Multiple choice, essay, Enumeration, true/false, false
        message: "{VALUE} is not supported",
      },
      default: "mc",
    },
    cluster: { type: String },
    category: { type: String },
    message: {
      type: String,
      enum: {
        values: ["easy", "moderate", "hard"], // Multiple choice, essay, Enumeration, true/false, false
        message: "{VALUE} is not supported",
      },
      default: "easy",
    },
    question: { type: String },
    mcAnswers: {
      a: {
        type: String,
      },
      b: {
        type: String,
      },
      c: {
        type: String,
      },
      d: {
        type: String,
      },
      ans: {
        type: String,
      },
    },
    boolAnswer: {
      true: {
        type: String,
      },
      false: {
        type: String,
      },
    },
    correctAnswer: { type: String },
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

const Entity = mongoose.model("banks", modelSchema);

module.exports = Entity;
