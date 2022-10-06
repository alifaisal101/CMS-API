const express = require("express");
const { body } = require("express-validator");

const authenticationMiddleWare = require("./../middlewares/authentication");
const authorizationMiddleWare = require("./../middlewares/authorization");

const analysisController = require("./../controllers/analysis");

const Router = express.Router();

Router.post(
  "/pull-analysis",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),

  analysisController.pullAnalsys
);

module.exports = Router;
