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
    price: 5,
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

describe('Admin Route Tests', () => {
  test('first test', async () => {
    console.log('First test runs');
    expect(1).toEqual(1);
  });
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

  describe('GET /admin/users/:username', () => {
    test('get user by username', async () => {
      const res = await request(app)
        .get(`/admin/users/${testUser.username}`)
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.username).toEqual('user1');
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get(`/admin/users/${testUser.username}`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get(`/admin/users/${testUser.username}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/:username/deactivate', () => {
    test('deactivate user account', async () => {
      let user = await User.getByUsername(testUser.username);
      expect(user.active).toEqual(true);
      const res = await request(app)
        .patch(`/admin/${testUser.username}/deactivate`)
        .set('authorization', `Bearer ${adminToken}`);
      user = await User.getByUsername(testUser.username);
      expect(res.body).toEqual(
        "You have successfully deactivated user1's account."
      );
      expect(user.active).toEqual(false);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .patch(`/admin/${testUser.username}/deactivate`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/${testUser.username}/deactivate`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/:username/reactivate', () => {
    test('reactivate user account', async () => {
      await User.toggleActive(testUser.username, true);
      let user = await User.getByUsername(testUser.username);
      expect(user.active).toEqual(false);
      const res = await request(app)
        .patch(`/admin/${testUser.username}/reactivate`)
        .set('authorization', `Bearer ${adminToken}`);
      user = await User.getByUsername(testUser.username);
      expect(res.body).toEqual(
        "You have successfully reactivated user1's account."
      );
      expect(user.active).toEqual(true);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .patch(`/admin/${testUser.username}/reactivate`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/${testUser.username}/reactivate`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/:username/makeAdmin', () => {
    test('make user account admin', async () => {
      let user = await User.getByUsername(testUser.username);
      expect(user.isAdmin).toEqual(false);
      const res = await request(app)
        .patch(`/admin/${testUser.username}/makeAdmin`)
        .set('authorization', `Bearer ${adminToken}`);
      user = await User.getByUsername(testUser.username);
      expect(res.body).toEqual(
        'You have successfully given user1 admin permissions.'
      );
      expect(user.isAdmin).toEqual(true);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .patch(`/admin/${testUser.username}/makeAdmin`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/${testUser.username}/makeAdmin`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/:username/removeAdmin', () => {
    test('make admin account user', async () => {
      await request(app)
        .patch(`/admin/${testAdmin.username}/makeAdmin`)
        .set('authorization', `Bearer ${adminToken}`);
      let admin = await User.getByUsername(testAdmin.username);
      expect(admin.isAdmin).toEqual(true);
      const res = await request(app)
        .patch(`/admin/${testAdmin.username}/removeAdmin`)
        .set('authorization', `Bearer ${adminToken}`);
      admin = await User.getByUsername(testAdmin.username);
      expect(res.body).toEqual(
        'You have successfully taken admin1 admin permissions.'
      );
      expect(admin.isAdmin).toEqual(false);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .patch(`/admin/${testUser.username}/removeAdmin`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/${testUser.username}/removeAdmin`);
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

  describe('GET /admin/items/:item_id', () => {
    test('get item by id', async () => {
      const res = await request(app)
        .get(`/admin/items/${testItem.itemId}`)
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.name).toEqual('item1');
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get(`/admin/items/${testItem.itemId}`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get(`/admin/items/${testItem.itemId}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/:item_id/edit', () => {
    test('update item by id', async () => {
      const res = await request(app)
        .patch(`/admin/${testItem.itemId}/edit`)
        .send({ name: 'newItem1' })
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body).toEqual(
        "You have successfully updated newItem1's details."
      );
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .patch(`/admin/${testItem.itemId}/edit`)
          .send({ name: 'newItem1' })
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/${testItem.itemId}/edit`);
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
      expect(res.body[0].transactionId).toEqual(testPurchase.transactionId);
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
