const express = require("express");
const { body } = require("express-validator");

const authorizationMiddleWare = require("./../../middlewares/authentication");

const usersController = require("./../../controllers/admin/users.admin");

const Router = express.Router();

Router.patch(
  "/change-admin-password",
  authorizationMiddleWare,
  body("newpassword").length({ min: 1, max: 10 }),
  body("confirm-newpassword").length({ min: 1, max: 10 }),

  usersController.changeAdminPassword
);

Router.put(
  "/add-user",
  body("userData").custom((userData) => {
    console.log(userData);
  }),
  usersController.addUser
);

Router.delete(
  "/delete-user",
  body("id").isMongoId(),
  usersController.deleteUser
);

Router.patch(
  "/edit-user",
  body("userData").custom((userData) => {
    console.log(userData);
  }),
  usersController.editUser
);

module.exports = Router;
