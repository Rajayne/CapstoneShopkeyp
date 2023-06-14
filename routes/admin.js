/* eslint-disable comma-dangle */
const jsonschema = require('jsonschema');
const express = require('express');
const {
  authenticateJWT,
  requireLogin,
  requireAdmin,
} = require('../middleware/auth');
const User = require('../models/user');
const Item = require('../models/item');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get(
  '/',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const users = await User.all();
      const items = await Item.all();
      const transactions = await Transaction.all();
      return res.json({
        totalUsers: users.length || 0,
        totalItems: items.length || 0,
        totalTransactions: transactions.length || 0,
      });
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  '/users',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const users = await User.all();
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  '/items',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const items = await Item.all();
      return res.json(items);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  '/transactions',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const transactions = await Transaction.all();
      return res.json(transactions);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
