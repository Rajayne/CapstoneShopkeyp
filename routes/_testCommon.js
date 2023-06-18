/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
import db from '../db.js';
import createToken from '../helpers/token.js';

export async function commonBeforeEach() {
  await db.query('BEGIN');
}

export async function commonAfterEach() {
  await db.query('ROLLBACK');
}

export async function commonAfterAll() {
  await db.end();
}

export const adminToken = createToken({ username: 'admin1', isAdmin: true });
export const u1Token = createToken({ username: 'user1', isAdmin: false });
export const u2Token = createToken({ username: 'user2', isAdmin: false });
