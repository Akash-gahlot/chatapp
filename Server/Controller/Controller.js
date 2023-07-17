const json = require("express");
const JWTtoken = require("../JWTtoken");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, resp) => {
  const { name, email, password, userPic } = req.body;
  if (!name || !email || !password) {
    resp.status(400).send({ message: `Enter All fields` });
    return;
  }
  const userExist = await User.findOne({ email }, { timeout: 20000 });
  if (userExist) {
    resp.status(400).send({ message: `This Email Already Registered !` });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    userPic,
  });
  if (user) {
    resp.status(200).json([
      { message: `Registration Successfull` },
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        userPic: user.userPic,
        token: JWTtoken(user._id),
      },
    ]);
  } else {
    resp.status(400).send({ message: `Unable to Register User For Now` });
  }
};

const login = async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(400).send({ message: `All fields are mandatory` });
    return;
  }
  const user = await User.findOne({ email });
  if (user) {
    if (await user.matchPassword(password)) {
      resp
        .status(200)
        .json([
          { message: `Login Verified` },
          { name: user.name, email: user.email },
        ]);
    } else {
      resp.status(400).send({ message: `Invalid Password ` });
    }
  } else {
    resp.status(400).send({ message: `No Such User Exist ` });
  }
};
module.exports = { registerUser, login };
