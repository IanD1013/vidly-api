// Get all the published courses that are $15 or more,
// or have the word 'by' in their title.

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");
}
