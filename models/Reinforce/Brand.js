const mongoose = require("mongoose");

// Small:50
// medium:10
// large: 10
// total: 10x10x50=5000
const packages = {
  type: Array,
  size: {
    type: String,
    enum: {
      values: ["small", "medium", "large", "xl", "xxl"],
      message: "{VALUE} is not supported",
    },
  },
  conversion: { type: Number },
  pack: {
    v: { type: Number },
    u: { type: String },
    q: { type: Number },
    b: { type: String },
  },
  hasRetail: { type: Boolean, default: false }, // if can broken to small pieces
};

const modelSchema = new mongoose.Schema(
  {
    genericId: { type: mongoose.Schema.Types.ObjectId, ref: "Generics" },
    name: { type: String },
    subname: { type: String },
    avatar: { type: String },
    barcode: { type: String },
    purpose: { type: String },
    halt: { type: String }, // separate this one | black listed products
    packages: packages,
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "halt", "banned"],
        message: "{VALUE} is not supported",
      },
    },
    deletedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byGenericId = function (fk) {
  return this.where({ fk });
};

const Entity = mongoose.model("Brands", modelSchema);

module.exports = Entity;
