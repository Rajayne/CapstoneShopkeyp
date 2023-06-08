const db = require('../db');

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
    this.user_id = userId;
    this.username = username;
    this.profile_image = profileImage;
    this.balance = balance;
    this.is_admin = isAdmin;
    this.active = active;
    this.date_created = dateCreated;
  }

  static async all() {
    const results = await db.query(
      `SELECT user_id, username, profile_image, balance, is_admin, active, date_created
         FROM users
         ORDER BY username`
    );
    return results.rows.map((u) => new User(u));
  }
}

module.exports = User;
