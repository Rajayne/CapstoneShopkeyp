/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
import Item from './item.js';
import db from '../db.js';
import ExpressError from '../expressError.js';
import User from './user.js';
import Transaction from './transaction.js';

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

let testUser;
let testAdmin;
let testItem;
let testTransaction;
const newTransaction = {
  action: 'purchase',
  quantity: 2,
  total: 10,
};

beforeAll(async () => {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM items');
  await db.query('DELETE FROM transactions');

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
    ['userPass1']
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
    ['adminPass1']
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
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('Transaction Model Tests', () => {
  test('creates testUser, testAdmin, testItem and testTransaction variables', async () => {
    expect(testUser instanceof User).toBeTruthy();
    expect(testAdmin instanceof User).toBeTruthy();
    expect(testItem instanceof Item).toBeTruthy();
    expect(testTransaction instanceof Transaction).toBeTruthy();
  });

  describe('Transaction.all', () => {
    test('gets all transactions', async () => {
      const transactions = await Transaction.all();
      expect(transactions).toEqual([testTransaction]);
    });
  });

  describe('Transaction.get(id)', () => {
    test('gets transaction by id', async () => {
      const transaction = await Transaction.get(testTransaction.transactionId);
      expect(transaction).toEqual(testTransaction);
    });

    test('returns error if user does not exist', async () => {
      try {
        await Transaction.get(0);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('Transaction.add', () => {
    test('returns error if missing required fields', async () => {
      try {
        await Transaction.add({ newTransaction });
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });

    test('adds new transaction if missing optional fields', async () => {
      try {
        newTransaction.toUser = testUser.userId;
        await Transaction.add(newTransaction);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });

    test('adds new transaction with all fields', async () => {
      newTransaction.fromUser = testAdmin.userId;
      newTransaction.toUser = testUser.userId;
      newTransaction.itemId = testItem.itemId;
      const transaction = await Transaction.add(newTransaction);
      expect(transaction instanceof Transaction).toBeTruthy();
      expect(transaction.action).toEqual('purchase');
    });
  });
});
