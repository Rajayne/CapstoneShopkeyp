const db = require('../db');
const User = require('./user');
const ExpressError = require('../expressError');
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

  [testUser] = user.rows.map((u) => new User(u));
  [testAdmin] = admin.rows.map((a) => new User(a));
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('User Model Tests', () => {
  describe('User.authenticate', () => {
    test('works', async () => {
      const user = await User.authenticate('user1', 'userPass1');
      expect(user).toEqual({
        username: 'user1',
        isAdmin: false,
      });
    });

    test('returns error if wrong username/password', async () => {
      try {
        await User.authenticate('user1', 'userPass2');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('User.register', () => {
    test('registers a new user', async () => {
      const user = await User.register('user2', 'userPass2');
      expect(user).toEqual({
        username: 'user2',
        isAdmin: false,
      });
    });

    test('returns error if username already taken', async () => {
      try {
        await User.register('user1', 'userPass1');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('User.all', () => {
    test('gets all users', async () => {
      const users = await User.all();
      expect(users).toEqual([testAdmin, testUser]);
    });
  });

  describe('User.get(id)', () => {
    test('gets user by id', async () => {
      const user = await User.get(testUser.userId);
      expect(user).toEqual(testUser);
    });

    test('returns error if user does not exist', async () => {
      try {
        await User.get(0);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
});
