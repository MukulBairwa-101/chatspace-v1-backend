const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profileImage: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
    isGoogleLoggedIn: {
      type: Boolean,
      default: false,
    },
    isFacebookLoggedIn: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      enum: ["Collabrative", "Personal"],
    },
    isAccountPrivate: {
      type: Boolean,
      default: false,
    },
    isOnboarded:{
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("this.password", this.password);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("matching", enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
