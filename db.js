/* eslint-disable import/extensions */
import pg from 'pg';
import { getDatabaseUri } from './config.js';

const { Client } = pg;
let db;

if (process.env.NODE_ENV === 'production') {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
  });
}

db.connect();

export default db;
