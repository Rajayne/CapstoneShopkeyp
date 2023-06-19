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
const newItem = {
  name: 'newItem',
  description: 'newItem description',
  itemImage: 'newItem.png',
  price: 10,
  stock: 1,
  purchasable: false,
};

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

  describe('PATCH /admin/users/:username/deactivate', () => {
    test('deactivate user account', async () => {
      let user = await User.getByUsername(testUser.username);
      expect(user.active).toEqual(true);
      const res = await request(app)
        .patch(`/admin/users/${testUser.username}/deactivate`)
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
          .patch(`/admin/users/${testUser.username}/deactivate`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(
          `/admin/users/${testUser.username}/deactivate`
        );
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/users/:username/reactivate', () => {
    test('reactivate user account', async () => {
      await User.toggleActive(testUser.username, true);
      let user = await User.getByUsername(testUser.username);
      expect(user.active).toEqual(false);
      const res = await request(app)
        .patch(`/admin/users/${testUser.username}/reactivate`)
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
          .patch(`/admin/users/${testUser.username}/reactivate`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(
          `/admin/users/${testUser.username}/reactivate`
        );
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/users/:username/makeAdmin', () => {
    test('make user account admin', async () => {
      let user = await User.getByUsername(testUser.username);
      expect(user.isAdmin).toEqual(false);
      const res = await request(app)
        .patch(`/admin/users/${testUser.username}/makeAdmin`)
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
          .patch(`/admin/users/${testUser.username}/makeAdmin`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/users/${testUser.username}/makeAdmin`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/users/:username/removeAdmin', () => {
    test('make admin account user', async () => {
      await request(app)
        .patch(`/admin/users/${testAdmin.username}/makeAdmin`)
        .set('authorization', `Bearer ${adminToken}`);
      let admin = await User.getByUsername(testAdmin.username);
      expect(admin.isAdmin).toEqual(true);
      const res = await request(app)
        .patch(`/admin/users/${testAdmin.username}/removeAdmin`)
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
          .patch(`/admin/users/${testUser.username}/removeAdmin`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(
          `/admin/users/${testUser.username}/removeAdmin`
        );
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

  describe('GET /admin/items/:itemId', () => {
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

  describe('POST /admin/items/new', () => {
    test('create new item', async () => {
      const res = await request(app)
        .post('/admin/items/new')
        .send(newItem)
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.name).toEqual('newItem');
    });
    test('return error if no data', async () => {
      try {
        await request(app)
          .post('/admin/items/new')
          .set('authorization', `Bearer ${adminToken}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .post('/admin/items/new')
          .send(newItem)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).post('/admin/items/new').send(newItem);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('PATCH /admin/items/:itemId/edit', () => {
    test('update item by id', async () => {
      const res = await request(app)
        .patch(`/admin/items/${testItem.itemId}/edit`)
        .send({ name: 'newItem1' })
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body).toEqual(
        "You have successfully updated newItem1's details."
      );
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .patch(`/admin/items/${testItem.itemId}/edit`)
          .send({ name: 'newItem1' })
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).patch(`/admin/items/${testItem.itemId}/edit`);
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

  describe('GET /admin/transactions/:transactionId', () => {
    test('get transaction by id', async () => {
      const res = await request(app)
        .get(`/admin/transactions/${testPurchase.transactionId}`)
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body.transactionId).toEqual(testPurchase.transactionId);
    });
    test('return error if not admin', async () => {
      try {
        await request(app)
          .get(`/admin/transactions/${testPurchase.transactionId}`)
          .set('authorization', `Bearer ${u1Token}`);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
    test('return error if not logged in', async () => {
      try {
        await request(app).get(
          `/admin/transactions/${testPurchase.transactionId}`
        );
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });
});
