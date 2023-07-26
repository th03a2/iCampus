const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batchs",
      // required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "levels",
    },
    assessedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    units: {
      type: String,
      enum: {
        values: ["old", "transferee", "returnee"], //old student , transferre,returnee
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    attachments: {
      nso: {
        type: String,
      },
      sf10: {
        type: String,
      },
      goodmoral: {
        type: String,
      },
    },
    subjects: { type: Array },
    phone: { type: String }, //
    issues: { type: Array }, // title: String , date :kelan inissue,issued By:Sino nag issue,
    miscellaneous: { type: Object }, //
    status: {
      type: String,
      enum: {
        values: ["pending", "active", "denied", "onprogress"], //pending, approved,denied,missing documents
        message: "{VALUE} is not supported, please select appropriate options",
      },
    }, //
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("enrollments", modelSchema);

module.exports = Entity;
