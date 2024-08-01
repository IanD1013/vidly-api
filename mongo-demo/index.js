const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      // arrow function will not work here as it does not have its own 'this', they use the "this" value of the enclosing execution context
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "web",
    author: "Mosh",
    tags: [],
    isPublished: true,
    price: 15,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
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

// UPDATE FIRST - 1:
async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: { author: "Mosh", isPublished: false },
    }
  );

  console.log(result); // { n: 1, nModified: 1, ok: 1 }
}

// UPDATE FIRST - 2:
// sometimes we need the updated document
async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "Jack", isPublished: true },
    },
    { new: true }
  );

  console.log(course);
}

/*********** Remove Documents **************/
async function removeCourse(id) {
  const result1 = await Course.deleteOne({ _id: id });
  const result2 = await Course.deleteMany({ isPublished: false }); // result shows # documents deleted

  const course = await Course.findByIdAndRemove(id); // returns the document that was removed, will return null if not found
  console.log(course);
}

createCourse();
