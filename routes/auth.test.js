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
    test('returns error if user does not exist', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'user0',
        password: 'password0',
      });
      expect(res.statusCode).toEqual(401);
    });
  });
});
