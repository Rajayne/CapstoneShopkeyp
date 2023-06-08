/* eslint-disable comma-dangle */
const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

let user1;
let admin1;

async function commonBeforeAll() {
  await db.query('DELETE FROM users');

  const user = await db.query(
    `INSERT INTO users 
      (username, password, isAdmin) 
    VALUES 
      ('user1', $1, false) 
    RETURNING 
      userId, 
      username, 
      profileImage, 
      balance,
      isAdmin,
      active,
      dateCreated`,
    [await bcrypt.hash('userPass1', BCRYPT_WORK_FACTOR)]
  );

  const admin = await db.query(
    `INSERT INTO users 
      (username, password, isAdmin) 
    VALUES 
      ('admin1', $1, true) 
    RETURNING 
      userId, 
      username, 
      profileImage, 
      balance,
      isAdmin,
      active,
      dateCreated`,
    [await bcrypt.hash('adminPass1', BCRYPT_WORK_FACTOR)]
  );

  user1 = user;
  admin1 = admin;
}

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
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  user1,
  admin1,
};
