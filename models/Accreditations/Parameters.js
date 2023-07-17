const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Areas" },
    name: { type: String },
    ao: { type: String },
    priority: { type: String },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byAreaId = areaId => this.where({ areaId });

const Entity = mongoose.model("Parameters", modelSchema);

module.exports = Entity;
