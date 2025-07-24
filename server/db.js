const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
});

db.connect();

module.exports = db;

// require('dotenv').config();
// require('dotenv').config({ override: true });
// const { Pool } = require('pg');

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,  // Required for Render-hosted DBs
//     },
// });

// module.exports = pool;
