const express = require("express");
const { body } = require("express-validator");

const authorizationMiddleWare = require("./../middlewares/authorization");

const analysisController = require("./../controllers/analysis");

const Router = express.Router();

Router.get(
  "/pull-analysis-today",
  (req, res, next) => {
    res.required_privilege = "analysis_view_data_today";
    next();
  },
  authorizationMiddleWare,

  analysisController.pullAnalsys
);

Router.post(
  "/pull-analysis",
  (req, res, next) => {
    res.required_privilege = "analysis_view_data_all";
    next();
  },
  authorizationMiddleWare,

  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),

  analysisController.pullAnalsys
);

module.exports = Router;
