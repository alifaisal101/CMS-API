const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MasterRouter = require("./src/routers/Router.Master");

const errorHandlingController = require("./src/controllers/errorHandling");

const PORT = process.env.PORT || 80;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

const app = express();
const errorHandlerListener = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(new Error());
});

app.use(bodyParser.json());

app.use(MasterRouter);

app.use((error, req, res, next) => {
  errorHandlingController.error(error, req, res);
});

errorHandlerListener.use((req, res, next) => {
  res.status(500).json({
    msg: "There is a problem currently with the server, please try again later. If the problem persist, please contact support.",
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
    errorHandlerListener.listen(PORT);
  });
