const config = require("config");
const Joi = require('joi');
const morgan = require('morgan');
const express = require("express");
const app = express();

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan Enabled");
}

const courses = [
    { id: 1, name: "courses1" },
    { id: 2, name: "courses2" },
    { id: 3, name: "courses3" }
];

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID not found");

    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Not Found
    if (!course) return res.status(404).send("The course with the given ID not found");


    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error);

    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Not Found
    if (!course) return res.status(404).send("The course with the given ID not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));