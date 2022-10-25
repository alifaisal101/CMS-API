const crypto = require("crypto");

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./../models/user");

exports.postLogin = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.fixedMessage = true;
  validation_err.message =
    "Validation Error, Make sure username/password are correct.";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  const { username } = req.body;

  User.findOne({ username: username })
    .then((result) => {
      if (!result) {
        return next(validation_err);
      }

      bcrypt
        .compare(req.body.password, result.password)
        .then((doMatch) => {
          if (doMatch) {
            console.log(result);
            const { _id, privileges } = result;
            const token = jwt.sign(
              {
                userId: _id,
              },
              process.env.JWT,
              { expiresIn: "1d" }
            );

            res.status(200).json({ token: token, _id, privileges });
          } else {
            return next(validation_err);
          }
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
};
