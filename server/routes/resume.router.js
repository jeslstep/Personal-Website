const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



// GET Route to get resume firebase link from database
router.get('/', (req, res) => {
    let sqlText = `SELECT firebase_link FROM "resume" ORDER BY id DESC LIMIT 1;`;
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

// POST Route to add resume firebase link to the databse
router.post('/', (req, res) => {
     let link = req.body;
     console.log('inserting:', link[0]);
    let sqlText = `INSERT INTO resume (firebase_link) VALUES ($1);`;
    pool.query(sqlText, [link[0]])
        .then((result) => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        })
});




module.exports = router;