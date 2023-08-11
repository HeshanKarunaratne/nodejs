const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB.."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date, default: Date.now
    },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function getCourses2() {
    return await Course
        .find({ isPublished: true })
        .or([{ tags: "frontend" }, { tags: "backend" }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
}

async function getCourses3() {
    return await Course
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        .select({ name: 1, author: 1, price: 1 });
}

async function run() {
    const courses = await getCourses3();
    console.log(courses);
}

run();