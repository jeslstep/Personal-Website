const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// GET Route to get tags for technologies used from database
router.get('/', (req, res) => {
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

// POST Route to add tags for technologies used to the databse
router.post('/', (req, res) => {
    let tagName = req.body
    console.log('posting new tech tag:', tagName[0]);
    let sqlText = `INSERT INTO tags (name) VALUES ($1);`;
    pool.query(sqlText, [tagName[0]])
        .then((result) => {
            res.send(result.rows);
            console.log(result.rows);

        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        })
});

// DELETE tag from the database 
router.delete('/delete/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = `DELETE FROM tags WHERE id=$1;`;
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


module.exports = router;