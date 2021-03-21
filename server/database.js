const Pool = require('pg').Pool;

//TODO: put config details in .env file
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'language',
    password: 'Peregrine123',
    port: 5432,
});

exports.pool = pool;