/* eslint-disable comma-dangle, no-param-reassign */
const db = require('../db');
const ExpressError = require('../expressError');
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
  }) {
    this.userId = userId;
    this.username = username;
    this.profileImage = profileImage;
    this.balance = balance;
    this.isAdmin = isAdmin;
    this.active = active;
    this.dateCreated = dateCreated;
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
      throw new ExpressError(`Duplicate username: ${username}`, 400);
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
}

module.exports = User;
