const jsonschema = require('jsonschema');
const express = require('express');
const User = require('../models/user');

const router = new express.Router();
const { createToken } = require('../helpers/token');
const userAuthSchema = require('../schemas/userAuth.json');
const userRegisterSchema = require('../schemas/userRegister.json');
const ExpressError = require('../expressError');

/** POST /auth/token:  { username, password } => { token }
 * User recieves auth token after logging in */
router.post('/login', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      throw new ExpressError('Bad Request', 400);
    }
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
