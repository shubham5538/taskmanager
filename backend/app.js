require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const middlewareFunction = (req, res, next) => {
    // Your middleware logic here
    next(); // Don't forget to call next() to pass control to the next middleware in the stack
  };



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("server start");
});

app.use(middlewareFunction);

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
