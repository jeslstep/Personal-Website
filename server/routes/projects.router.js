const express = require('express');
const router = express.Router();
const pg = require('pg');

// DO NOT MODIFY THIS FILE FOR BASE MODE
// DB CONNECTION
const config = {
    database: 'portfolio',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log('connected');
});

pool.on("error", (err) => {
    console.log('not connected', err);
});

// GET Route to get projects 
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "projects" ORDER BY "id" DESC;`;
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

// GET Route to get a projects tags by project id
router.get('/projecttags/:id', (req, res) => {
    let project_id = req.params.id;
    console.log('GET request for id', project_id);
    let sqlText = `SELECT * FROM "project_tags" WHERE project_id = $1 ORDER BY "tag_name" DESC;`;
    pool.query(sqlText, [project_id])
        .then((result) => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        })
});

// GET Route to get tags for menu 
router.get('/tags', (req, res) => {
    let sqlText = `SELECT * FROM "tags" ORDER BY "id" DESC;`;
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

// POST to projects and project_tags tables
router.post('/', (req, res) => {
    let projects = req.body;
    console.log(projects);
    let sqlText = `INSERT INTO projects (name, description, thumbnail, website, github, date_completed)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`
    pool.query(sqlText, [projects.name, projects.thumbnail, projects.description, projects.website,
        projects.github, projects.date_completed])
        .then((result) => {
            console.log(result);
            let project_id = result; 
            for (let tag_name of projects.tag_name) {
                let sqlText2 = `INSERT INTO project_tags (project_id, tag_name)
                VALUES ( $1, $2 );`
                pool.query(sqlText2, [project_id, tag_name])
                console.log(result);
                res.send(projects);
            }
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})


// DELETE project and its tags 
router.delete('/delete/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = `DELETE FROM projects WHERE id=$1;`;
    console.log(sqlText);
    pool.query(sqlText, [reqId])
        .then((result) => {
            let sqlText2 = `DELETE FROM project_tags WHERE id=$1;`;
            console.log(sqlText2);
            pool.query(sqlText2, [reqId])
            console.log('tags deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in deleting ${sqlText}`, error);
            res.sendStatus(500);
        })
})

module.exports = router;