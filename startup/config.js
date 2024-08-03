const config = require("config");
const winston = require("winston");

module.exports = function () {
  // console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // return undefined if not set
  // console.log(`app: ${app.get("env")}`);            // return development by default

  winston.info("Application Name: " + config.get("name"));
  winston.info("Mail Server: " + config.get("mail.host"));
  // console.log("Mail Password: " + config.get("mail.password"));

  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
