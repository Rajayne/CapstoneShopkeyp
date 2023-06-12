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
    this.quantity = quantity;
    this.total = total;
    this.adminId = adminId;
    this.transactionDate = transactionDate;
  }

  static async all() {
    const results = await db.query(
      `SELECT
          transaction_id AS "transactionId",
          from_user AS "fromUser",
          to_user AS "toUser",
          action,
          item_id AS "itemId",
          quantity,
          total,
          admin_id AS "adminId",
          transaction_date AS "transactionDate"
        FROM transactions`
    );
    return results.rows.map((t) => new Transaction(t));
  }

  static async get(transactionId) {
    const results = await db.query(
      `SELECT 
        transaction_id AS "transactionId",
        from_user AS "fromUser",
        to_user AS "toUser",
        action,
        item_id AS "itemId",
        quantity,
        total,
        admin_id AS "adminId",
        transaction_date AS "transactionDate"
       FROM transactions
       WHERE transaction_id = $1`,
      [transactionId]
    );

    const transaction = results.rows[0];

    if (transaction === undefined) {
      throw new ExpressError(`No such transaction: ${transactionId}`, 404);
    }

    return new Transaction(transaction);
  }

  static async add({
    fromUser,
    toUser,
    action,
    itemId,
    quantity,
    total,
    adminId,
  }) {
    try {
      const results = await db.query(
        `INSERT INTO transactions
          (from_user, 
          to_user, 
          action, 
          item_id, 
          quantity,
          total,
          admin_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING 
          transaction_id AS "transactionId",
          from_user AS "fromUser",
          to_user AS "toUser",
          action,
          item_id AS "itemId",
          quantity,
          total,
          admin_id AS "adminId",
          transaction_date AS "transactionDate"`,
        [fromUser, toUser, action, itemId, quantity, total, adminId || null]
      );
      const transaction = results.rows[0];
      if (transaction === undefined) {
        throw new ExpressError('Invalid data', 400);
      }
      return new Transaction(transaction);
    } catch (e) {
      throw new ExpressError('Invalid data', 400);
    }
  }
}

module.exports = Transaction;
