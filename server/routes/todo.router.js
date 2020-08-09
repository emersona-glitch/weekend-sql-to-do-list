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
    `;
    pool.query(queryText, [req.body.name,
                           req.body.description]).then(result => {
        res.sendStatus(201);
        // console.log(result);
    }).catch((error) => {
        console.log('error in router post:', error);
        res.sendStatus(500);
    })
});

// READ -- (get) -- (select from)
router.get('/', (req, res) => {
    // SELECT * FROM "tasks" ORDER BY "entered";
    let queryText = `
        SELECT * FROM "tasks" ORDER BY "id";        
    `;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error in router get', error);
        res.sendStatus(500);
    });
});

/*
// UPDATE -- (put) -- (update set)
let queryText = `
`;
*/
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
/*
// DELETE -- (delete) -- (delete from)
// delete single entry
*/

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

/*
let queryText = `
    DELETE FROM "koalas"
    WHERE "id" = $1;
`;

// delete completed entries
let queryText = `
    DELETE FROM "koalas"
    WHERE "completed"
` */
module.exports = router;
