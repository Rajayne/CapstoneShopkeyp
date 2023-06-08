const db = require('../db');
const User = require('./user');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

let testAdmin;
let testUser;

beforeAll(async () => {
  await db.query('DELETE FROM users');

  const user = await db.query(
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
    [await bcrypt.hash('adminPass1', BCRYPT_WORK_FACTOR)]
  );

  testUser = user.rows.map((u) => new User(u));
  testAdmin = admin.rows.map((a) => new User(a));
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('User.authenticate', () => {
  test('works', async () => {
    const user = await User.authenticate('user1', 'userPass1');
    expect(user).toEqual({
      username: 'user1',
      isAdmin: false,
    });
  });
});

describe('User.all', () => {
  test('gets all users', async () => {
    const users = await User.all();
    expect(users).toEqual([testAdmin[0], testUser[0]]);
  });
});
