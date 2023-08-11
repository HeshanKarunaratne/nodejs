const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB.."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date, default: Date.now
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Angular Course",
        author: "Mosh",
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}
// createCourse();

async function getCourses() {

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: /^Mosh/ })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: -1 })
        .count();
    console.log(courses);
}
// getCourses();

async function updateCourse(id) {
    const course = await Course.findById(id);

    if (!course) return;

    course.isPublished = true;
    course.author = "Another Author";
    const result = await course.save();
    console.log(result);
}
updateCourse("64cfa44cc9751e8a8080a162");