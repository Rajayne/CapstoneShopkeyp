/* eslint-disable comma-dangle */
const request = require('supertest');
const db = require('../db');
const User = require('../models/user');
const Item = require('../models/item');
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

beforeAll(async () => {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM items');
  await db.query('DELETE FROM transactions');
  await db.query('DELETE FROM user_items');

  testAdmin = await User.register('admin1', 'adminPass1');
  testUser = await User.register('user1', 'userPass1');
  testItem = await Item.add({
    name: 'item1',
    description: 'description1',
    price: 5,
    createdBy: testAdmin.userId,
  });
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('Users Route Tests', () => {
  describe('Creates variables', () => {
    test('user variables', async () => {
      const users = await User.all();
      expect(users instanceof Array).toBeTruthy();
      expect(users.length).toEqual(2);
    });
    test('item variables', async () => {
      const items = await Item.all();
      expect(items instanceof Array).toBeTruthy();
      expect(items.length).toEqual(1);
    });
  });

  describe('GET /users', () => {
    test('gets all users', async () => {
      const res = await request(app)
        .get('/users')
        .set('authorization', `Bearer ${adminToken}`);
      expect(res.body instanceof Array).toBeTruthy();
      expect(res.body[0].username).toEqual('admin1');
      expect(res.body[1].username).toEqual('user1');
    });
    test('returns error if not logged in', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /users/:username', () => {
    test('gets user by username', async () => {
      const res = await request(app)
        .get(`/users/${testUser.username}`)
        .set('authorization', `Bearer ${u1Token}`);
      expect(res.body.username).toEqual('user1');
    });
    test('returns error if not logged in', async () => {
      const res = await request(app).get(`/users/${testUser.username}`);
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('PATCH /users/:username/edit', () => {
    test('updates user', async () => {
      const res = await request(app)
        .patch(`/users/${testUser.username}/edit`)
        .set('authorization', `Bearer ${u1Token}`)
        .send({ username: 'newUser1' });
      expect(res.body).toEqual(
        "You have successfully updated newUser1's profile."
      );
    });
    test('returns error if not logged in', async () => {
      const res = await request(app)
        .patch(`/users/${testUser.username}/edit`)
        .send({ username: 'newUser1' });
      expect(res.statusCode).toEqual(401);
    });
  });
});
