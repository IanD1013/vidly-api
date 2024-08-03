require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const error = require("./middleware/error");

const courses = require("./routes/courses");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const home = require("./routes/home");
const express = require("express");
app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

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
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);
app.use(error);

const port = process.env.PORT || 3000; // set PORT=5000 to change port
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
