/* eslint-disable comma-dangle */
const { createToken } = require('../helpers/token');
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

const adminToken = createToken({ username: 'admin1', isAdmin: true });
const u1Token = createToken({ username: 'user1', isAdmin: false });
const u2Token = createToken({ username: 'user2', isAdmin: false });

module.exports = {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
