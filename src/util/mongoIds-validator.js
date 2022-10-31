const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (idsArray) => {
  let validArray = true;
  if (idsArray.length < 1) {
    return false;
  }
  idsArray.map((id) => {
    if (!ObjectId.isValid(id)) {
      validArray = false;
    }
  });
  return validArray;
};
