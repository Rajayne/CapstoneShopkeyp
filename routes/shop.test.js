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

  await User.updateBalance(testUser.userId, 10);

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
  describe('GET /shop/item/:itemId', () => {
    test('gets shop item by id for user', async () => {
      const res = await request(app)
        .get(`/shop/item/${testItem.itemId}`)
        .set('authorization', `Bearer ${u1Token}`);
      expect(res.body).toEqual(testItem);
    });
    test('gets shop item by id for admin', async () => {
      const res = await request(app)
        .get(`/shop/item/${testItem.itemId}`)
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body).toEqual(testItem);
    });
    test('returns error if not logged in', async () => {
      try {
        await request(app).get(`/shop/item/${testItem.itemId}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
  describe('POST /shop/item/:itemId/purchase', () => {
    test('user can purchase item from shop', async () => {
      const res = await request(app)
        .post(`/shop/item/${testItem.itemId}/purchase`)
        .send({
          toUser: testUser.username,
          itemId: testItem.itemId,
          quantity: 2,
          total: 10,
        })
        .set('authorization', `Bearer ${u1Token}`);
      expect(res.body.toUser).toEqual(testUser.userId);
      expect(res.body.action).toEqual('purchase');
      const user = await User.getByUsername(testUser.username);
      expect(user.inventory.length).toEqual(1);
      expect(user.inventory[0].itemId).toEqual(testItem.itemId);
    });
    test('returns error if wrong user', async () => {
      try {
        await request(app)
          .post(`/shop/item/${testItem.itemId}/purchase`)
          .send({
            itemId: testItem.itemId,
            quantity: 2,
            total: 10,
          })
          .set('authorization', `Bearer ${u2Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('returns error if not logged in', async () => {
      try {
        await request(app).post(`/shop/item/${testItem.itemId}/purchase`).send({
          itemId: testItem.itemId,
          quantity: 2,
          total: 10,
        });
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
});
