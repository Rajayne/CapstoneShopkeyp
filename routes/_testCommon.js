const db = require('../db');
const User = require('../models/user');
const Item = require('../models/item');
const { createToken } = require('../helpers/token');

async function commonBeforeAll() {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM items');
  await db.query('DELETE FROM transactions');
  await db.query('DELETE FROM user_items');

  const admin = await User.register({
    username: 'a1',
    password: 'password0',
    isAdmin: true,
  });
  await User.register({
    username: 'u1',
    password: 'password1',
  });
  await User.register({
    username: 'u2',
    password: 'password2',
  });

  await Item.add({
    name: 'newItem',
    description: 'newItem description',
    itemImage: 'newItem.png',
    price: 10,
    stock: 1,
    purchasable: false,
    createdBy: admin.userId,
  });
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}
const adminToken = createToken({ username: 'a1', isAdmin: true });
const u1Token = createToken({ username: 'u1', isAdmin: false });
const u2Token = createToken({ username: 'u2', isAdmin: false });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
