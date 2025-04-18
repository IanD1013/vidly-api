const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.Console());
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
