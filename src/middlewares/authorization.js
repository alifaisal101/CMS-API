module.exports = (req, res, next) => {
  const required_privilege = res.required_privilege;

  if (!res.userData.privileges || !required_privilege) {
    console.log("YES");
    const err = new Error();
    return next(err);
  }

  const isAdmin = res.userData.privileges.includes("admin");
  if (isAdmin) {
    return next();
  }

  const privileged = res.userData.privileges.includes(required_privilege);
  if (!privileged) {
    const err = new Error();
    err.message = "Unauthorized";
    err.statusCode = 403;
    return next(err);
  }
  return next();
};
