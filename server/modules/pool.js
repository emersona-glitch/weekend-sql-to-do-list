const pg = require('pg');

let config = {}

if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: { rejectUnauthorized: false },
        // ssl: true,
        max: 10,
        idleTimeoutMillis: 30000
    };
} else {
    const config = {
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 10000
    }
}


const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to postgres');
});

pool.on('error', (error) => {
    console.log('error connecting to postgres', error);
});

module.exports = pool;
