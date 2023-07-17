const express = require("express");
const { registerUser, login } = require("../Controller/Controller");
const route = express.Router();

//route page

//route api

route.post("/register", registerUser);
route.post("/login", login);

module.exports = route;
