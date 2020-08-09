const express = require('express');
const router = express.Router();
// const pg = require('pg');
// use pool as a module stored in this directory

const pool = require('../modules/pool');


// CREATE -- (post) -- (insert into)
router.post('/', (req, res) => {
    let queryText = `
    INSERT INTO "tasks"
        ("name", "description", "entered")
    VALUES
        ($1, $2, transaction_timestamp());
    `;  // we feed our information from req.body into the queryText 
        // by using sanitized inputs, to prevent any malicious
        // entries from being evaluated by our postgres
    pool.query(queryText, [req.body.name,
                           req.body.description]).then(result => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in router post:', error);
        res.sendStatus(500);
    })
});

// READ -- (get) -- (select from)
router.get('/', (req, res) => {
    let queryText = `
        SELECT * FROM "tasks" ORDER BY "id";        
    `;
    // we want to order our list of tasks by id, which is also
    // a function of the order in which they were created. We
    // do this to keep everything appearing consistently on the
    // dom and so it won't move around as we change other values.
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error in router get', error);
        res.sendStatus(500);
    });
});


// UPDATE -- (put) -- (update set)
router.put('/complete/:id', (req, res) => {
    let queryText = `
    UPDATE "tasks"
    SET "completed" = transaction_timestamp()
    WHERE id = $1;
    `;
    pool.query(queryText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in router put complete', error);
        res.sendStatus(500);
    });
});

router.put('/incomplete/:id', (req, res) => {
    let queryText = `
    UPDATE "tasks"
    SET "completed" = NULL
    WHERE id = $1;
    `;
    pool.query(queryText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in router put incomplete', error);
        res.sendStatus(500);
    });
});

// DELETE -- (delete) -- (delete from)
router.delete('/:id', (req, res) => {
    let queryText = `
        DELETE FROM "tasks"
        WHERE "id" = $1;
    `;
    pool.query(queryText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in router.delete', error);
        res.sendStatus(500);
    });
});

// We call a special url when we want to delete all entries
// in our database that have been completed, i.e. all those
// entries where their completed column is not NULL
router.delete('/delete/completed', (req, res) => {
    let queryText = `
        DELETE FROM "tasks"
        WHERE "completed" IS NOT NULL;
    `;
    pool.query(queryText).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in router delete all', error);
        res.sendStatus(500);
    });
})

module.exports = router;
