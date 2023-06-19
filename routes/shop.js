/* eslint-disable comma-dangle */
const express = require('express');
const {
  authenticateJWT,
  requireLogin,
  authorizePurchase,
} = require('../middleware/auth');
const Item = require('../models/item');
const User = require('../models/user');

const router = express.Router();

router.get('/', authenticateJWT, requireLogin, async (req, res, next) => {
  try {
    const items = await Item.purchasable();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

router.get(
  '/item/:itemId',
  authenticateJWT,
  requireLogin,
  async (req, res, next) => {
    try {
      const item = await Item.get(req.params.itemId);
      return res.json(item);
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  '/item/:itemId/purchase',
  authenticateJWT,
  requireLogin,
  authorizePurchase,
  async (req, res, next) => {
    try {
      const transaction = await User.purchase(req.body);
      return res.json(transaction);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
