CREATE TABLE "tasks"
(
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(120) NOT NULL,
"description" VARCHAR(200) DEFAULT 'n/a',
"entered" DATE NOT NULL,		--get 'this' date
"completed" DATE				--when null, == 'not completed'
);

-- INSERT INTO "tasks"
-- 	( "name", "description", "entered")
-- VALUES
-- 	( 'testing', 'this is a test', transaction_timestamp() );

--SELECT CURRENT_TIMESTAMP;
--SELECT now();
--SELECT TIMESTAMP 'now';
--SELECT transaction_timestamp()


