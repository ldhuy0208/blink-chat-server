const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const APIError = require("../helpers/ErrorResponse");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    tokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.path("email").validate(async function (email) {
  if (!this.isModified("email")) return true;

  const otherUserSameEmail = await this.constructor.findOne({ email });
  return !otherUserSameEmail;
}, "Email already exists!");

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.ROUND_HASH)
    );
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;