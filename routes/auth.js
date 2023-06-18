/* eslint-disable import/extensions */
import jsonschema from 'jsonschema';
import express from 'express';

import User from '../models/user.js';
import createToken from '../helpers/token.js';
import ExpressError from '../expressError.js';
import { requireLogin } from '../middleware/auth.js';

import userAuthSchema from '../schemas/userAuth.json' assert { type: "json" };
import userRegisterSchema from '../schemas/userRegister.json' assert { type: "json" };

const router = new express.Router();

router.post('/logout', requireLogin, async (req, res, next) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    return res.status(200).json('You have successfully logged out.');
  } catch (e) {
    return next(e);
  }
});

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

/** POST /auth/register: { user } => { token }
 * New user recieves login token after registering */
router.post('/register', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      throw new ExpressError('Bad Request', 400);
    }

    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

export default router;
