/* eslint-disable comma-dangle */
const db = require('../db');
const User = require('./user');
const Item = require('./item');
const Transaction = require('./transaction');
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
let testItem;
let testTransaction;

beforeAll(async () => {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM items');
  await db.query('DELETE FROM transactions');
  await db.query('DELETE FROM user_items');

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

  const item = await db.query(
    `INSERT INTO items
      (name, description, item_image, price, created_by)
    VALUES
      ('item1', 'description1',  'item1.png', 5, $1)
    RETURNING
      item_uuid AS "itemUuid",
      item_id AS "itemId",
      name,
      description,
      item_image AS "itemImage",
      price,
      stock,
      purchasable,
      created_by AS "createdBy",
      date_created AS "dateCreated"`,
    [testAdmin.userId]
  );

  [testItem] = await item.rows.map((i) => new Item(i));

  const transaction = await db.query(
    `INSERT INTO transactions
      (from_user, to_user, action, item_id, quantity, total, admin_id)
    VALUES
      ($1, $2, 'purchase',  $3, $4, $5, $6)
    RETURNING
      transaction_id AS "transactionId",
      from_user AS "fromUser",
      to_user AS "toUser",
      action,
      item_id AS "itemId",
      quantity,
      total,
      admin_id AS "adminId",
      transaction_date AS "transactionDate"`,
    [
      testAdmin.userId,
      testUser.userId,
      testItem.itemId,
      2,
      testItem.price * 2,
      null,
    ]
  );

  [testTransaction] = await transaction.rows.map((t) => new Transaction(t));

  await db.query(
    `INSERT INTO user_items
      (user_id, item_id, quantity)
    VALUES
      ($1, $2, $3)
    RETURNING
      user_id AS "userId",
      item_id AS "itemId",
      quantity`,
    [testUser.userId, testItem.itemId, 2]
  );
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

  describe('User.getById', () => {
    test('gets user by id', async () => {
      testUser.transactions.push(testTransaction.transactionId);
      testUser.inventory.push(testItem.itemId);
      const user = await User.getById(testUser.userId);
      expect(user).toEqual(testUser);
    });

    test('displays user transactions on model', async () => {
      const user = await User.getById(testUser.userId);
      expect(user.transactions[0]).toEqual(testTransaction.transactionId);
    });

    test('displays user items on model', async () => {
      const user = await User.getById(testUser.userId);
      expect(user.inventory[0]).toEqual(testItem.itemId);
    });

    test('returns error if user does not exist', async () => {
      try {
        await User.getById(0);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('User.getByUsername', () => {
    test('gets user by username', async () => {
      const user = await User.getByUsername(testUser.username);
      expect(user).toEqual(testUser);
    });

    test('displays user transactions on model', async () => {
      const user = await User.getByUsername(testUser.username);
      expect(user.transactions[0]).toEqual(testTransaction.transactionId);
    });

    test('displays user items on model', async () => {
      const user = await User.getByUsername(testUser.username);
      expect(user.inventory[0]).toEqual(testItem.itemId);
    });

    test('returns error if user does not exist', async () => {
      try {
        await User.getByUsername('notUser1');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('User.update', () => {
    const updateData = {
      username: 'newUser1',
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
        await User.update(testUser.userId, {});
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('User.toggleIsAdmin', () => {
    test('gives admin permissions', async () => {
      const res = await User.toggleIsAdmin(testUser.userId, testUser.isAdmin);
      expect(res).toEqual(
        'You have successfully given user1 admin permissions.'
      );
    });
    test('removes admin permissions', async () => {
      const res = await User.toggleIsAdmin(testAdmin.userId, testAdmin.isAdmin);
      expect(res).toEqual(
        'You have successfully taken admin1 admin permissions.'
      );
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

  describe('User.inInventory', () => {
    test('check for items in user inventory', async () => {
      const check = await User.inInventory(testUser.userId, testItem.itemId);
      expect(check).toEqual(true);
    });
  });

  describe('User.updateInventory', () => {
    test('update quantity in user inventory', async () => {
      const updateQuantity = await User.updateInventory(
        testUser.userId,
        testItem.itemId,
        2
      );
      expect(updateQuantity).toEqual(4);
    });
  });

  describe('User.purchase', () => {
    test('purchase adds item to user inventory and creates transaction', async () => {
      const transaction = await User.purchase({
        toUser: testUser.userId,
        action: 'purchase',
        itemId: testItem.itemId,
        quantity: 2,
        total: 10,
      });
      expect(transaction instanceof Transaction).toBeTruthy();
    });
  });
});
