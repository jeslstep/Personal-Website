const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



// GET Route to get projects from database
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "projects" ORDER BY "id";`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        })
}); 

// POST project to the database
router.post('/', (req, res) => {
    let projects = req.body;
    console.log(projects);
    let sqlText = `INSERT INTO projects (name, description, thumbnail , website, github)
    VALUES ($1, $2, $3, $4, $5);`
    pool.query(sqlText, [projects.name, projects.description, projects.thumbnail, projects.website,
        projects.github])
        .then((result) => {
            console.log(result);
            res.send(projects);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})


// DELETE project from the database 
router.delete('/delete/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = `DELETE FROM projects WHERE id=$1;`;
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log(result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in deleting ${sqlText}`, error);
            res.sendStatus(500);
        })
})

// UPDATE projects in the database

// TO BE ADDED
module.exports = router;