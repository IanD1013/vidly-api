const mongoose = require("mongoose");

// 1. Connect to MongoDB
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// 2. Create a schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// 3. Compile schema into a model and gives a class
const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "Node.js Course",
  author: "Mosh",
  tags: ["node", "backend"],
  isPublished: true,
});

// 4. Save the course to the database
course.save().then((result) => console.log(result));
