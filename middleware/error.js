const winston = require("winston"); // Declare winston
const { createLogger, format, transports } = require("winston"); // Import all needed using Object Destructuring
const { combine, timestamp, printf } = format;

module.exports = function (err, req, res, next) {
  // Export the module
  const logger = createLogger({
    level: "error",
    format: combine(
      format.errors({ stack: true }), // log the full stack
      timestamp(), // get the time stamp part of the full log message
      printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${message} - ${stack}`; // formating the log outcome to show/store
      }),
      format.metadata() // >>>> ADD THIS LINE TO STORE the ERR OBJECT IN META field
    ),
    transports: [
      new transports.Console(), // show the full stack error on the console
      new winston.transports.File({
        // log full stack error on the file
        filename: "logfile.log",
        format: format.combine(
          format.colorize({
            all: false,
          })
        ),
      }),
      new winston.transports.MongoDB({
        db: "mongodb://localhost/vidly",
        // collection: "log",
        level: "error",
        storeHost: true,
        capped: true,
        // metaKey: 'meta'
      }),
    ],
  });

  logger.log({
    level: "error",
    message: err,
  });

  res.status(500).send("Something failed.");
};
