const express = require("express");
const { body } = require("express-validator");

const logsController = require("./../../controllers/admin/logs.admin");

const dataType = require("../util/data-type");
const mongoIdsValidator = require("../util/mongoIds-validator")
const Router = express.Router();

const LOG_ACTIONS = [];

Router.post(
  "/pull-logs",
      
  body("actions").custom(actions => {
    if(!actions){throw err;}
    if(actions.length < 1){throw err} 
    
    actions.map(action => {
        if(!LOG_ACTIONS.includes(action))
{
    throw err;
}
    });
    return true;
  }),
  body("userIds").custom(userIds => {
      if(!mongoIdsValidator(userIds)){
          throw err;
      }
      return true;
  }),
 
    body("dateSearchType")
    .custom((dateSearchType) => {
      if (!pullPatients_SEARCHTYPES.includes(dateSearchType)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("startDate").isDate().optional({ nullable: true }),
  body("endDate").isDate().optional({ nullable: true }),

  logsController.pullLogs
);

Router.post(
  "/clear-logs",
    body("actions").custom(actions => {
    if(!actions){throw err;}
    if(actions.length < 1){throw err} 
    
    actions.map(action => {
        if(!LOG_ACTIONS.includes(action))
{
    throw err;
}
    });
    return true;
  }),
  body("userIds").custom(userIds => {
      if(!mongoIdsValidator(userIds)){
          throw err;
      }
      return true;
  }),
 
    body("dateSearchType")
    .custom((dateSearchType) => {
      if (!pullPatients_SEARCHTYPES.includes(dateSearchType)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("startDate").isDate().optional({ nullable: true }),
  body("endDate").isDate().optional({ nullable: true }),

  logsController.clearLogs
);

module.exports = Router;
