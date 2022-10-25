const jwt = require("jsonwebtoken");

const User = require("./../models/user");

module.exports = async (req, res, next) => {
  const Autherr = new Error();
  Autherr.message = "Not Authenticated";
  Autherr.statusCode = 401;

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return next(Autherr);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(Autherr);
  }

  let result;
  result = jwt.verify(token, process.env.JWT, function (err, decoded) {
    if (!err) {
      return decoded;
    }
  });

  if (!result) {
    return next(Autherr);
  }

  let userDataFromDb;
  try {
    userDataFromDb = await User.findById(result.userId, { password: 0 });
  } catch (err) {
    err.statusCode = 500;
    throw next(err);
  }

  res.userData = {
    userId: userDataFromDb._id,
    privileges: userDataFromDb.privileges,
    username: userDataFromDb.username,
  };

  return next();
};
