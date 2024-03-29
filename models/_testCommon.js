/* eslint-disable comma-dangle */
const db = require('../db');

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
