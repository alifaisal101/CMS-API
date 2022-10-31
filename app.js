const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MasterRouter = require("./src/routers/Router.Master");

const SpecialValue = require("./src/models/specialValue");

const errorHandlingController = require("./src/controllers/errorHandling");
const initalizer = require("./initializer");

const PORT = process.env.PORT || 80;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const INITALIZE = process.env.INITALIZE === "true" || false;
const app = express();
const errorHandlerListener = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
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
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    SpecialValue.findOne({ type: "initalized" })
      .then(async (initalizedResults) => {
        let isInitalized;

        if (initalizedResults) {
          isInitalized = initalizedResults.value === "yes";
        } else {
          isInitalized = false;
        }

        if (INITALIZE) {
          if (isInitalized) {
            console.warn(
              "\x1b[33m%s\x1b[0m",
              `API had already been in initalized. Make sure you're connecting to the correct Database Server. Exiting with code 2.`
            );
            return process.exit(2);
          } else {
            return initalizer(initalizedResults);
          }
        }
        if (isInitalized) {
          return app.listen(PORT);
        } else {
          console.warn(
            "\x1b[33m%s\x1b[0m",
            `API has not been initalized. Make sure you're connecting to the correct Database Server. To initalize, Pass "initalize=true" as an environment variable. Exiting with code 2.`
          );
          return process.exit(2);
        }
      })
      .catch((err) => {
        console.warn("\x1b[31m", "Error connecting to the database.");
        return process.exit(1);
      });
  })
  .catch((err) => {
    errorHandlerListener.listen(PORT);
  });
