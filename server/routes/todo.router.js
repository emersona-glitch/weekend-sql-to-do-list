const express = require('express');
const router = express.Router();
// const pg = require('pg');
// use pool as a module stored in this directory
const pool = require('../modules/pool');


/* 
// CREATE -- (post) -- (insert into)
let queryText = `
    INSERT INTO "koalas"
        ("name", "name", "description", "entered")
    VALUES
        ($1, $2, $3, transaction_timestamp);
`;

// READ -- (get) -- (select from)
let queryText = `
    SELECT * FROM "tasks" ORDER BY "entered";
`;

// UPDATE -- (put) -- (update set)
let queryText = `
    UPDATE "koalas"
    SET "completed" = transaction_timestamp);
    WHERE id = $1;
`;

// DELETE -- (delete) -- (delete from)
// delete single entry
let queryText = `
    DELETE FROM "koalas"
    WHERE "id" = $1;
`;

// delete completed entries
let queryText = `
    DELETE FROM "koalas"
    WHERE "completed"
` */