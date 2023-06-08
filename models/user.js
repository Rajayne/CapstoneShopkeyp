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
    this.userId = userId;
    this.username = username;
    this.profileImage = profileImage;
    this.balance = balance;
    this.isAdmin = isAdmin;
    this.active = active;
    this.dateCreated = dateCreated;
  }
}

module.exports = User;
