/* eslint-disable comma-dangle */
const db = require('../db');
const bcrypt = require('bcrypt');

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
}

module.exports = User;
