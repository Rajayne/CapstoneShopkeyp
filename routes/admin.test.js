/* eslint-disable comma-dangle */
const request = require('supertest');
const db = require('../db');
const User = require('../models/user');
const Item = require('../models/item');
const Transaction = require('../models/transaction');
const ExpressError = require('../expressError');

const app = require('../app');

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
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

  await User.register('admin1', 'adminPass1');
  await User.register('user1', 'userPass1');

  testAdmin = await User.getByUsername('admin1');
  testUser = await User.getByUsername('user1');

  testItem = await Item.add({
    name: 'item1',
    description: 'description1',
    price: 5,
    createdBy: testAdmin.userId,
  });

  testTransaction = await Transaction.add({
    toUser: testUser.userId,
    action: 'purchase',
    itemId: testItem.itemId,
    quantity: 2,
    total: 10,
  });
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('Admin Route Tests', () => {
  describe('Creates variables', () => {
    test('user variables', async () => {
      expect(testAdmin instanceof User).toBeTruthy();
      expect(testUser instanceof User).toBeTruthy();
    });
    test('item variables', async () => {
      expect(testItem instanceof Item).toBeTruthy();
    });
    test('item variables', async () => {
      expect(testTransaction instanceof Transaction).toBeTruthy();
    });
  });

  describe('GET /admin', () => {
    test('get total users', async () => {
      const res = await request(app)
        .get('/admin')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.totalUsers).toEqual(2);
    });
    test('get total items', async () => {
      const res = await request(app)
        .get('/admin')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.totalItems).toEqual(1);
    });
    test('get total transactions', async () => {
      const res = await request(app)
        .get('/admin')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.totalTransactions).toEqual(1);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get('/admin')
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get('/admin');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
  describe('GET /admin/users', () => {
    test('get all users', async () => {
      const res = await request(app)
        .get('/admin/users')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body instanceof Array).toBeTruthy();
      expect(res.body[0].username).toEqual('admin1');
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get('/admin/users')
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get('/admin/users');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
  describe('GET /admin/items', () => {
    test('get all items', async () => {
      const res = await request(app)
        .get('/admin/items')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body instanceof Array).toBeTruthy();
      expect(res.body[0].name).toEqual('item1');
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get('/admin/items')
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get('/admin/items');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
  describe('GET /admin/transactions', () => {
    test('get all transactions', async () => {
      const res = await request(app)
        .get('/admin/transactions')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body instanceof Array).toBeTruthy();
      expect(res.body[0].transactionId).toEqual(testTransaction.transactionId);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get('/admin/transactions')
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get('/admin/transactions');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
});
