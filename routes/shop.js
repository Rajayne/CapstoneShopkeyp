/* eslint-disable comma-dangle */
const express = require('express');
const { authenticateJWT, requireLogin } = require('../middleware/auth');
const Item = require('../models/item');

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

module.exports = router;
