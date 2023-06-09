/* eslint-disable comma-dangle */
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

  describe('User.update', () => {
    const updateData = {
      username: 'newUser1',
      isAdmin: true,
    };

    test('updates user data', async () => {
      const res = await User.update(testUser.userId, updateData);
      expect(res).toEqual("You have successfully updated newUser1's profile.");
    });

    test('updates user password', async () => {
      const res = await User.update(testAdmin.userId, {
        password: 'newAdminPass1',
      });
      expect(res).toEqual("You have successfully updated admin1's profile.");
      const found = await db.query(
        "SELECT * FROM users WHERE username = 'admin1'"
      );
      expect(found.rows.length).toEqual(1);
      expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
    });

    test('returns error if user does not exist', async () => {
      try {
        await User.update(0, {
          username: 'user1',
        });
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });

    test('returns error if no data', async () => {
      expect.assertions(1);
      try {
        await User.update('user1', {});
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('User.toggleActive', () => {
    test('deactivates user account', async () => {
      const res = await User.toggleActive(testUser.userId, testUser.active);
      expect(res).toEqual("You have successfully deactivated user1's account.");
    });

    test('reactivates user account', async () => {
      await User.toggleActive(testUser.userId, testUser.active);
      const res = await User.toggleActive(testUser.userId, false);
      expect(res).toEqual("You have successfully reactivated user1's account.");
    });

    test('returns error if user does not exist', async () => {
      expect.assertions(1);
      try {
        await User.toggleActive(0);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
});
