const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    parameterId: { type: mongoose.Schema.Types.ObjectId, ref: "Parameters" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String },
    descriptions: { type: String },
    key1: { type: String },
    key2: { type: String },
    key3: { type: String },
    src: { type: String }, //pdf
    has_done: { type: Boolean },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byParameterId = parameterId => this.where({ parameterId });

const Entity = mongoose.model("Indicators", modelSchema);

module.exports = Entity;
