const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
const projectsRouter = require('./routes/projects.router.js');
const resumeRouter = require('./routes/resume.router');
const tagsRouter = require('./routes/tags.router');
app.use('/projects', projectsRouter);
app.use('/resume', resumeRouter);
app.use('/tags', tagsRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});