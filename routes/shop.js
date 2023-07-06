/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
const express = require('express');
const {
  authenticateJWT,
  requireLogin,
  authorizePurchase,
} = require('../middleware/auth.js');
const {
  getItemByID,
  getPurchasable,
  createPurchaseItem,
} = require('../controllers/shop.controller.js');

const router = express.Router();

router.get('/', authenticateJWT, requireLogin, getPurchasable);

router.get('/item/:itemId', authenticateJWT, requireLogin, getItemByID);

router.post(
  '/item/:itemId/purchase',
  authenticateJWT,
  requireLogin,
  authorizePurchase,
  createPurchaseItem
);

module.exports = router;
