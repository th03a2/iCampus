const mongoose = require("mongoose");

// https://en.wikipedia.org/wiki/List_of_medical_abbreviations
const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    abbreviation: { type: String },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
    packages: {
      type: Array,
    },
    discountable: {
      type: Boolean,
      default: false,
    },
    tat: { type: Number, default: 0 },
    isProfile: {
      type: Boolean,
      default: false,
    },
    isPromo: {
      type: Boolean,
      default: false,
    },
    hasReseco: {
      type: Boolean,
      default: false,
    },
    capital: { type: Number, default: 0 },
    refund: { type: Number, default: 0 },
    opd: { type: Number, default: 0 }, // walkin | opd
    er: { type: Number, default: 0 }, // emergency room
    cw: { type: Number, default: 0 }, // Charity Ward
    pw: { type: Number, default: 0 }, // Private ward
    hmo: { type: Number, default: 0 }, // health maintenance org
    vp: { type: Number }, // vendor price | 5% from srp
    sc: { type: Number }, // subcontract | 10% from srp
    ssc: { type: Number }, // special subcontract | 20% from srp
    promo: { type: Number, default: 0 },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byBranchId = function (branchId) {
  return this.where({ branchId });
};

const Entity = mongoose.model("Menus", modelSchema);

module.exports = Entity;
