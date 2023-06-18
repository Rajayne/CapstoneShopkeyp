// The auth controllers
import jsonschema from 'jsonschema';

import userAuthSchema from '../schemas/userAuth.json' assert { type: "json" };
import userRegisterSchema from '../schemas/userRegister.json' assert { type: "json" };

import User from '../models/user.js';
import createToken from '../helpers/token.js';
import ExpressError from '../expressError.js';

export const userLogout = async (req, res, next) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    return res.status(200).json('You have successfully logged out.');
  } catch (e) {
    return next(e);
  }
};

export const userLogin = async (req, res, next) => {
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
};

export const userRegister = async (req, res, next) => {
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
};
