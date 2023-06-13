/* eslint-disable comma-dangle */
const jsonschema = require('jsonschema');

const express = require('express');
const {
  authenticateJWT,
  ensureCorrectUserOrAdmin,
  requireAdmin,
  requireLogin,
} = require('../middleware/auth');
const ExpressError = require('../expressError');
const User = require('../models/user');
const { createToken } = require('../helpers/token');
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

/* Create new user, ensure Admin */
router.get('/', authenticateJWT, requireLogin, async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.get(
  '/:userId',
  authenticateJWT,
  requireLogin,
  async (req, res, next) => {
    try {
      const user = await User.getById(req.params.userId);
      if (!user) {
        throw new ExpressError('No such user', 404);
      } else {
        return res.json(user);
      }
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
