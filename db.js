const { Client } = require('pg');
const { user, password } = require('../dbPassword');

const DB_URI =
  process.env.NODE_ENV === 'test'
    ? `postgresql://${user}:${password}@localhost:5432/shopkeyp_test`
    : `postgresql://${user}:${password}@localhost:5432/shopkeyp`;

const db = new Client({
  connectionString: DB_URI,
});

db.connect();

module.exports = db;
