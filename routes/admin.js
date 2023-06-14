/* eslint-disable comma-dangle */
const jsonschema = require('jsonschema');

const express = require('express');
const { authenticateJWT, requireAdmin } = require('../middleware/auth');
const ExpressError = require('../expressError');
const User = require('../models/user');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

/* Create new user, ensure Admin */
router.get('/', authenticateJWT, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});
