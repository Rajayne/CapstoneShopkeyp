/* eslint-disable comma-dangle */
const db = require('../db');
const User = require('./user');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

let testAdmin;
let testUser;

async function commonBeforeAll() {
  await db.query('DELETE FROM users');

  const admin = await db.query(
    `INSERT INTO users 
      (username, password, profile_image, is_admin) 
    VALUES 
      ('user1', $1, 'userProfile.png', false) 
    RETURNING 
      user_id AS "userId",
      username,
      profile_image AS "profileImage",
      balance,
      is_admin AS "isAdmin",
      active,
      date_created AS "dateCreated"`,
    [await bcrypt.hash('userPass1', BCRYPT_WORK_FACTOR)]
  );

  const user = await db.query(
    `INSERT INTO users 
      (username, password, profile_image, is_admin) 
    VALUES 
      ('admin1', $1, 'adminProfile.png', true) 
      RETURNING 
      user_id AS "userId",
      username,
      profile_image AS "profileImage",
      balance,
      is_admin AS "isAdmin",
      active,
      date_created AS "dateCreated"`,
    [await bcrypt.hash('adminPass1', BCRYPT_WORK_FACTOR)]
  );

  testAdmin = admin.rows.map((a) => new User(a));
  testUser = user.rows.map((u) => new User(u));
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
  testAdmin,
  testUser,
};
