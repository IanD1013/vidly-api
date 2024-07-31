const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");

const courses = require("./routes/courses");
const genres = require("./routes/genres");
const home = require("./routes/home");

const express = require("express");
app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // return undefined if not set
// console.log(`app: ${app.get("env")}`);            // return development by default

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Third-party middlewares
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// Db work...
dbDebugger("Connected to the database...");

// Custom middlewares
app.use(logger);
app.use("/api/courses", courses);
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3000; // set PORT=5000 to change port
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
