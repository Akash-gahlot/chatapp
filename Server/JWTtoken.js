const jwt = require("jsonwebtoken");

const JWTtoken = (id) => {
  return jwt.sign({ id }, "akash", {
    expiresIn: "30d",
  });
};

module.exports = JWTtoken;
