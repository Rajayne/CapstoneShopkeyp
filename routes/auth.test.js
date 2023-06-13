/* eslint-disable comma-dangle */
const request = require('supertest');
const db = require('../db');
const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

const app = require('../app');

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
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

describe('Auth Route Tests', () => {
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

  describe('Auth/login', () => {
    test('POST works', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ username: 'admin1', password: 'adminPass1' });
      expect(res.body).toEqual({
        token: expect.any(String),
      });
    });
    test('returns error if incorrect password', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'user1',
        password: 'password0',
      });
      expect(res.statusCode).toEqual(401);
    });
    test('returns error if user does not exist', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'user0',
        password: 'password0',
      });
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('Auth/register', () => {
    test('POST works', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ username: 'admin1', password: 'adminPass1' });
      expect(res.body).toEqual({
        token: expect.any(String),
      });
    });
    test('returns error if username taken', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'user1',
        password: 'password0',
      });
      expect(res.statusCode).toEqual(401);
    });
    test('returns error if missing fields', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'user0',
      });
      expect(res.statusCode).toEqual(400);
    });
  });
});
