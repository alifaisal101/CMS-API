const readlineSync = require("readline-sync");
const bcrypt = require("bcryptjs");

const DEFAULT_CHECKS = require("./init-data/default-checks.json");

const SpecialValue = require("./src/models/specialValue");
const SenderDoctor = require("./src/models/SenderDoctor");
const User = require("./src/models/user");
const Check = require("./src/models/check");

module.exports = async (initalizedResults) => {
  try {
    const adminUser = await User.findOne(
      { username: "admin" },
      { password: 0 }
    );
    const opSender = await SenderDoctor.findOne({ name: "op" });
    const checksFromDB = await Check.find();

    if (!opSender) {
      await SenderDoctor.create({ name: "op" });
    }
    console.log(checksFromDB);
    if (checksFromDB.length < 1) {
      console.log(await Check.create(DEFAULT_CHECKS));
    }

    if (adminUser) {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        `Admin user already exists. This is not normal.`
      );
    } else {
      const password = readlineSync.question("Enter Admin Password: ", {
        hideEchoBack: true,
        mask: "",
      });
      const cpassword = readlineSync.question("ReEnter Password: ", {
        hideEchoBack: true,
        mask: "",
      });

      if (password !== cpassword) {
        console.warn("\x1b[31m", "Passwords don't match.");
        return process.exit(1);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const createAdminResult = User.create({
        username: "admin",
        privileges: ["admin"],
        password: hashedPassword,
      });

      if (!createAdminResult) {
        console.warn("\x1b[31m", "Error connecting to the database.");
        return process.exit(1);
      }
    }
    if (initalizedResults === null) {
      await SpecialValue.create({
        type: "initalized",
        value: "yes",
      });
    } else {
      await SpecialValue.findByIdAndUpdate(initalizedResults._id, {
        value: "yes",
      });
    }

    console.log(
      "\x1b[32m",
      'API has been successfully initalized. To use, Remove "INITALIZE" as an environment variable and relanuch the API. Closing with code 0.'
    );
    return process.exit(0);
  } catch (err) {
    console.log(err);
    console.warn("\x1b[31m", "Error connecting to the database.");
    return process.exit(1);
  }
};
