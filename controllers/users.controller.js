/* eslint-disable import/extensions */
// The users controllers
import jsonschema from 'jsonschema';

import ExpressError from '../expressError.js';
import User from '../models/user.js';
import userUpdateSchema from '../schemas/userUpdate.json' assert { type: "json" };

export const createNewAdminUser = async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.getByUsername(req.params.username);
    if (!user) {
      throw new ExpressError('No such user', 404);
    } else {
      return res.json(user);
    }
  } catch (err) {
    return next(err);
  }
};

export const toggleAdmin = async (req, res, next) => {
  const validator = jsonschema.validate(req.body, userUpdateSchema);
  if (!validator.valid) {
    throw new ExpressError('Bad Request', 400);
  }
  try {
    const fields = {
      username: req.body.username,
      password: req.body.password,
      profileImage: req.body.profileImage,
    };

    Object.keys(fields).forEach(
      (key) => fields[key] === undefined && delete fields[key],
    );

    if (Object.keys(fields).length === 0) {
      throw new ExpressError('Unauthorized or blank fields.', 401);
    }

    const user = await User.update(req.params.username, fields);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const updateUserActiveStatus = async (req, res, next) => {
  try {
    const users = await User.toggleActive(req.params.username, true);
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const users = await User.toggleActive(req.params.username, false);
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};
