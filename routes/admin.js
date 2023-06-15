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
const ExpressError = require('../expressError');
const itemUpdateSchema = require('../schemas/itemUpdate.json');

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
  '/users/:username/',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const user = await User.getByUsername(req.params.username);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/:username/deactivate',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const user = await User.toggleActive(req.params.username, true);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/:username/reactivate',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const user = await User.toggleActive(req.params.username, false);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/:username/makeAdmin',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const user = await User.toggleIsAdmin(req.params.username, false);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/:username/removeAdmin',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const user = await User.toggleIsAdmin(req.params.username, true);
      return res.json(user);
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
  '/items/:itemId',
  authenticateJWT,
  requireLogin,
  requireAdmin,
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
  '/items/new',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const item = await Item.add(req.body);
      return res.json(item);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/:itemId/edit',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    const validator = jsonschema.validate(req.body, itemUpdateSchema);
    if (!validator.valid) {
      throw new ExpressError('Bad Request', 400);
    }
    try {
      const fields = {
        itemUuid: req.body.itemUuid,
        name: req.body.name,
        description: req.body.description,
        itemImage: req.body.itemImage,
        price: req.body.price,
        stock: req.body.stock,
        purchasable: req.body.stock,
      };

      Object.keys(fields).forEach(
        (key) => fields[key] === undefined && delete fields[key]
      );

      if (Object.keys(fields).length === 0) {
        throw new ExpressError('Unauthorized or blank fields.', 401);
      }

      const item = await Item.update(req.params.itemId, fields);

      return res.json(item);
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
