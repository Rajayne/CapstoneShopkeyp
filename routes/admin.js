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
const itemNewSchema = require('../schemas/itemNew.json');
const adminUpdateSchema = require('../schemas/adminUpdate.json');

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
  '/users/:username/deactivate',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const validator = jsonschema.validate(req.body, adminUpdateSchema);
      if (!validator.valid) {
        throw new ExpressError('Bad Request', 400);
      }
      const user = await User.toggleActive(req.params.username, true);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/users/:username/reactivate',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const validator = jsonschema.validate(req.body, adminUpdateSchema);
      if (!validator.valid) {
        throw new ExpressError('Bad Request', 400);
      }
      const user = await User.toggleActive(req.params.username, false);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/users/:username/makeAdmin',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const validator = jsonschema.validate(req.body, adminUpdateSchema);
      if (!validator.valid) {
        throw new ExpressError('Bad Request', 400);
      }
      const user = await User.toggleIsAdmin(req.params.username, false);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/users/:username/removeAdmin',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const validator = jsonschema.validate(req.body, adminUpdateSchema);
      if (!validator.valid) {
        throw new ExpressError('Bad Request', 400);
      }
      const user = await User.toggleIsAdmin(req.params.username, true);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/users/:username/updateBalance',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const validator = jsonschema.validate(req.body, adminUpdateSchema);
      if (!validator.valid) {
        throw new ExpressError('Bad Request', 400);
      }
      const user = await User.updateBalance(
        req.params.username,
        req.body.amount
      );
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

router.post(
  '/items/new',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const adminId = await User.checkUsernameIdSwitch(user.username);
      req.body.createdBy = adminId;
      const validator = jsonschema.validate(req.body, itemNewSchema);
      if (!validator) {
        throw new ExpressError('Bad Request', 400);
      }
      const item = await Item.add(req.body);
      return res.json(item);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  '/items/:itemId/edit',
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
        itemId: req.body.Id,
        name: req.body.name,
        description: req.body.description,
        itemImage: req.body.itemImage,
        price: req.body.price,
        stock: req.body.stock,
        purchasable: req.body.purchasable,
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

module.exports = router;
