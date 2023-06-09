/* eslint-disable comma-dangle */
const db = require('../db');
const ExpressError = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Transaction {
  constructor({
    transactionId,
    fromUser,
    toUser,
    action,
    itemId,
    quantity,
    total,
    adminId,
    transactionDate,
  }) {
    this.transactionId = transactionId;
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.action = action;
    this.itemId = itemId;
    this.total = total;
    this.quantity = quantity;
    this.adminId = adminId;
    this.transactionDate = transactionDate;
  }
}

module.exports = Transaction;
