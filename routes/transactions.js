/* eslint-disable comma-dangle */
const express = require('express');
const {
  authenticateJWT,
  ensureCorrectUserOrAdmin,
  requireLogin,
  requireAdmin,
} = require('../middleware/auth');
const Transaction = require('../models/transaction');

const router = express.Router();

/* Create new user, ensure Admin */
router.get(
  '/',
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

router.get(
  '/:transactionId',
  authenticateJWT,
  requireLogin,
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const transaction = await Transaction.get(req.params.transactionId);
      return res.json(transaction);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
