const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userPic: {
      type: String,
      required: true,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
  },
  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const user = mongoose.model("User", userModel);
module.exports = user;
