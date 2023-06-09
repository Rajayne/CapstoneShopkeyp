const db = require('../db');
const User = require('./user');
const ExpressError = require('../expressError');

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

let testAdmin;
let testItem;

beforeAll(async () => {
  await db.query('DELETE FROM users');

  const admin = await db.query(
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
    ['adminPass1']
  );

  [testAdmin] = admin.rows.map((a) => new User(a));
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
