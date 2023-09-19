const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
      // required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tests",
    },
    subjectId: {
      type: Number,
      // required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    type: {
      type: String,
      enum: {
        values: ["mc", "essay", "boolean"], // Multiple choice, essay, true/false
        message: "{VALUE} is not supported",
      },
      default: "mc",
    },
    cluster: { type: String },
    category: { type: String },
    message: {
      type: String,
      enum: {
        values: ["easy", "moderate", "hard"],
        message: "{VALUE} is not supported",
      },
      default: "easy",
    },
    question: { type: String },
    mcAnswers: {
      type: Array,
    },
    boolAnswer: {
      true: {
        type: String,
      },
      false: {
        type: String,
      },
    },
    specification: { type: String },
    levelId: { type: Number },
    enumerationAns: { type: Array }, //enumaration answer
    correctAnswer: { type: String },
    matchingQuestions: { type: Array },
    matchingAnswers: { type: Array },
    confusedAnswers: { type: Array },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranch = function (branchId) {
  return this.where({ branchId });
};
modelSchema.query.byCompanies = function (companies) {
  return this.where({ companyId: { $in: companies } });
};

const Entity = mongoose.model("banks", modelSchema);

module.exports = Entity;
