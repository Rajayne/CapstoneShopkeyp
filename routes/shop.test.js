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
  adminToken,
} = require('./_testCommon');

let testAdmin;
let testUser;
let testItem;
let testPurchase;

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
    price: 10,
    purchasable: true,
    createdBy: testAdmin.userId,
  });
  await Item.add({
    name: 'item2',
    description: 'description2',
    price: 10,
    purchasable: false,
    createdBy: testAdmin.userId,
  });

  testPurchase = await User.purchase({
    toUser: testUser.username,
    action: 'purchase',
    itemId: testItem.itemId,
    quantity: 2,
    total: 10,
  });
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('Shop Route Tests', () => {
  describe('Creates variables', () => {
    test('user variables', async () => {
      expect(testAdmin instanceof User).toBeTruthy();
      expect(testUser instanceof User).toBeTruthy();
    });
    test('item variable', async () => {
      expect(testItem instanceof Item).toBeTruthy();
    });
    test('transaction variable', async () => {
      expect(testPurchase instanceof Transaction).toBeTruthy();
    });
  });
  describe('GET /shop', () => {
    test('displays purchasable items to users', async () => {
      const items = await Item.all();
      expect(items.length).toEqual(2);
      const res = await request(app)
        .get('/shop')
        .set('authorization', `Bearer ${u1Token}`);
      expect(res.body.length).toEqual(1);
      expect(res.body[0].name).toEqual('item1');
    });
    test('displays purchasable items to admins', async () => {
      const res = await request(app)
        .get('/shop')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.length).toEqual(1);
      expect(res.body[0].name).toEqual('item1');
    });
    test('returns error if not logged in', async () => {
      try {
        await request(app).get('/shop');
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
});
