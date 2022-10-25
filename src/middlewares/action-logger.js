const Log = require("./../models/log");

module.exports = async (req, res, next, action, message) => {
  const log_data = {
    actionType: action,
    message: message,
    created_at: new Date(),
  };

  if (res.userData) {
    log_data.userId = res.userData.userId;
  }

  try {
    Log.create(log_data);
  } catch (err) {
    next(err);
  }

  next();
};
