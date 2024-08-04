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
        return `${timestamp} ${level}: ${message} - ${stack}`; // formatting the log outcome to show/store
      }),
      format.metadata() // Store the ERR object in the META field
    ),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(), // Colorize the console output
          format.simple() // Simple format for console output
        ),
      }), // Show the full stack error on the console
      new transports.File({
        filename: "logfile.log",
        format: format.combine(
          format.uncolorize(), // Ensure no colorization in the file
          format.json() // Store logs in JSON format in the file
        ),
      }),
    ],
  });

  logger.log({
    level: "error",
    message: err.message,
    stack: err.stack,
    meta: err,
  });

  console.error(err); // Log the error to the console directly

  res.status(500).send("Something failed.");
};
