/* eslint-disable comma-dangle */
const db = require('../db');
const bcrypt = require('bcrypt');
const ExpressError = require('../expressError');
const { BCRYPT_WORK_FACTOR } = require('../config.js');

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
