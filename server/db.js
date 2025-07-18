const { Client } = require('pg');

const db = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'crud_operation',
    password: 'postgres',
    port: 5432,
});

db.connect();

module.exports = db;