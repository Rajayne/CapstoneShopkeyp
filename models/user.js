/* eslint-disable comma-dangle, no-param-reassign */
const db = require('../db');
const ExpressError = require('../expressError');
const Transaction = require('./transaction');
const { sqlForPartialUpdate } = require('../helpers/sql');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
  constructor({
    userId,
    username,
    profileImage,
    balance,
    isAdmin,
    active,
    dateCreated,
    transactions,
    inventory,
  }) {
    this.userId = userId;
    this.username = username;
    this.profileImage = profileImage;
    this.balance = balance;
    this.isAdmin = isAdmin;
    this.active = active;
    this.dateCreated = dateCreated;
    this.transactions = transactions || [];
    this.inventory = inventory || [];
  }

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
              password,
              is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new ExpressError('Invalid username/password', 401);
  }

  static async register(username, password) {
    const duplicateCheck = await db.query(
      `SELECT username
        FROM users
        WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0]) {
      throw new ExpressError('Username not available', 400);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
         (username,
          password)
        VALUES ($1, $2)
        RETURNING username, is_admin AS "isAdmin"`,
      [username, hashedPassword]
    );

    const user = result.rows[0];

    return user;
  }

  static async all() {
    const results = await db.query(
      `SELECT user_id AS "userId", 
         username,  
         profile_image AS "profileImage",
         balance,
         is_admin AS "isAdmin",
         active,
         date_created AS "dateCreated"
       FROM users
       ORDER BY username`
    );
    return results.rows.map((u) => new User(u));
  }

  static async get(userId) {
    const results = await db.query(
      `SELECT user_id AS "userId", 
         username,  
         profile_image AS "profileImage",
         balance,
         is_admin AS "isAdmin",
         active,
         date_created AS "dateCreated"
       FROM users
       WHERE user_id = $1`,
      [userId]
    );

    const user = results.rows[0];

    if (user === undefined) {
      throw new ExpressError(`No such user: ${userId}`, 404);
    }

    const userTransactionsRes = await db.query(
      `SELECT t.transaction_id
       FROM transactions AS t
       WHERE t.to_user = $1`,
      [userId]
    );

    if (userTransactionsRes) {
      user.transactions = userTransactionsRes.rows.map((t) => t.transaction_id);
    }

    const userItemsRes = await db.query(
      `SELECT ui.item_id
       FROM user_items AS ui
       WHERE ui.user_id = $1`,
      [userId]
    );

    if (userItemsRes) {
      user.inventory = userItemsRes.rows.map((ui) => ui.item_id);
    }
    return new User(user);
  }

  static async update(userId, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      profileImage: 'profile_image',
      isAdmin: 'is_admin',
    });

    const userIdIdx = `$${values.length + 1}`;

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE user_id = ${userIdIdx}
                      RETURNING username`;
    const result = await db.query(querySql, [...values, userId]);

    const user = result.rows[0];

    if (!user) throw new ExpressError(`User does not exist: ${userId}`, 404);

    return `You have successfully updated ${user.username}'s profile.`;
  }

  static async toggleActive(userId, active) {
    const result = await db.query(
      `UPDATE users
       SET active = ${!active}
       WHERE user_id = ${userId}
       RETURNING username, active`
    );
    const user = result.rows[0];

    if (!user) throw new ExpressError(`User does not exist: ${userId}`, 404);

    return `You have successfully ${
      user.active ? 'reactivated' : 'deactivated'
    } ${user.username}'s account.`;
  }

  static async inInventory(userId, itemId) {
    const checkInventory = await db.query(
      'SELECT item_id AS itemId FROM user_items WHERE user_id = $1 AND item_id = $2',
      [userId, itemId]
    );

    if (checkInventory) {
      return true;
    }
    return false;
  }

  static async updateInventory(userId, itemId, quantity) {
    if (this.inInventory(userId, itemId)) {
      const updateInventory = await db.query(
        `UPDATE user_items
        SET quantity = quantity + $1
        WHERE user_id = $2 AND item_id = $3
        RETURNING quantity`,
        [quantity, userId, itemId]
      );
      if (!updateInventory.rows[0]) throw new ExpressError('Invalid data', 400);
      return updateInventory.rows[0].quantity;
    }
    const createInventory = await db.query(
      `INSERT INTO user_items
        (user_id, item_id, quantity)
        VALUES
        ($1, $2, $3)
        RETURNING quantity`,
      [userId, itemId, quantity]
    );

    if (!createInventory.rows[0]) throw new ExpressError('Invalid data', 400);
    return createInventory.rows[0].quantity;
  }

  static async purchase({
    fromUser,
    toUser,
    action,
    itemId,
    quantity,
    total,
    adminId,
  }) {
    const update = this.updateInventory(toUser, itemId, quantity);
    if (update) {
      const transaction = await Transaction.add({
        fromUser: fromUser || null,
        toUser,
        action,
        itemId,
        quantity: quantity || 0,
        total: total || 0,
        adminId: adminId || null,
      });
      return new Transaction(transaction);
    }
    return new ExpressError('Invalid data', 400);
  }
}

module.exports = User;
