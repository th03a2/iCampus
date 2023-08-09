const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      fname: {
        type: String,
        trim: true,
        required: true,
      },
      mname: {
        type: String,
        trim: true,
      },
      lname: {
        type: String,
        trim: true,
        required: true,
      },
      suffix: {
        type: String,
        default: "",
      },
    },
    address: {
      street: {
        type: String,
        trim: true,
        default: "",
      },
      barangay: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      province: {
        type: String,
        trim: true,
        default: "",
      },
      region: {
        type: String,
        trim: true,
        default: "",
      },
    },
    bop: {
      // birth place
      street: {
        type: String,
        trim: true,
        default: "",
      },
      barangay: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      province: {
        type: String,
        trim: true,
        default: "",
      },
      region: {
        type: String,
        trim: true,
        default: "",
      },
    },
    dob: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      // unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    alias: { type: String },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    motherId: { type: String },
    fatherId: { type: String },
    mmn: {
      // mothers maiden name
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      //by phone || email
      type: Boolean,
    },
    isMale: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    siblings: {
      type: Array,
      default: [],
    },
    guardian: {
      id: {
        type: String,
      },
      relationship: {
        type: String,
      },
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
