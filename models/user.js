/* eslint-disable comma-dangle */
const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const ExpressError = require('../expressError');

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
}

module.exports = User;
