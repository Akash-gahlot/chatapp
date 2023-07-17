const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const { response, json } = require("express");
const connectDB = require("./database");
const Router = require("../Server/Routes/Router");
const { populate } = require("./Model/userModel");
const { notfound, errorHandler } = require("../Server/Middlewares/Error");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
app.use(express.json());
//db connect
connectDB();

app.get("/run", (req, resp) => {
  resp.send("I am running");
});
//Route and API call
app.use("/", Router);
app.use(notfound);
app.use(errorHandler);
app.listen(PORT, console.log(`Server has started at ${PORT}`));
