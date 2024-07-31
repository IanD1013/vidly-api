const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

/*********** Query Documents **************/
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })

    // .find()
    // .or([ { author: 'Mosh' }, { isPublished: true } ])
    // .and([ ])

    // .find({ author: /^Mosh/ }) // Starts with Mosh
    // .find({ author: /Hamedani$/i }) // Ends with Hamedani, i is for case insensitive
    // .find({ author: /.*Mosh.*/i }) // Contains Mosh

    // .skip((pageNumber - 1) * pageSize)
    .limit(10)
    .sort({ name: 1 }) // 1 for ascending, -1 for descending
    // .count()
    .select({ name: 1, tags: 1 }); // 1 for including, 0 for excluding

  console.log(courses);
}

/*********** Update Documents **************/
// Approach: Query first
// findById()
// Modify its properties
// save()

// Approach: Update first
// Update directly
// Optionally: get the updated document

// QUERY FIRST:
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  const result = await course.save();
  console.log(result);
}

updateCourse();
