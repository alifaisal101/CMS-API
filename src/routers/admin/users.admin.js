const express = require("express");
const { body } = require("express-validator");

const authorizationMiddleWare = require("./../../middlewares/authentication");

const usersController = require("./../../controllers/admin/users.admin");

const Router = express.Router();

Router.patch(
  "/change-admin-password",
  (req, res, next) => {
    res.required_privilege = "admin";
    next();
  },
  authorizationMiddleWare,
  body("newpassword").isLength({ min: 1, max: 10 }),
  body("confirm-newpassword").isLength({ min: 1, max: 10 }),

  usersController.changeAdminPassword
);

Router.put(
  "/add-user",
  (req, res, next) => {
    res.required_privilege = "user_management_edit";
    next();
  },
  authorizationMiddleWare,
  body("userData").custom((userData) => {
    console.log(userData);
  }),
  usersController.addUser
);

Router.delete(
  "/delete-user",
  (req, res, next) => {
    res.required_privilege = "user_management_delete";
    next();
  },
  authorizationMiddleWare,
  body("id").isMongoId(),
  usersController.deleteUser
);

Router.patch(
  "/edit-user",
  (req, res, next) => {
    res.required_privilege = "user_management_edit";
    next();
  },
  authorizationMiddleWare,
  body("userData").custom((userData) => {
    console.log(userData);
  }),
  usersController.editUser
);

module.exports = Router;
