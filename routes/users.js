const jsonschema = require('jsonschema');

const express = require('express');
const {
  authenticateJWT,
  ensureCorrectUserOrAdmin,
  ensureAdmin,
  ensureLoggedIn,
} = require('../middleware/auth');
const ExpressError = require('../expressError');
const User = require('../models/user');
const { createToken } = require('../helpers/token');
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

/* Create new user, ensure Admin */
router.get('/', ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
