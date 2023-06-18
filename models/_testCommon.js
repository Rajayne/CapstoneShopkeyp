/* eslint-disable comma-dangle */
// eslint-disable-next-line import/extensions
import db from '../db.js';

export async function commonBeforeEach() {
  await db.query('BEGIN');
}

export async function commonAfterEach() {
  await db.query('ROLLBACK');
}

export async function commonAfterAll() {
  await db.end();
}
