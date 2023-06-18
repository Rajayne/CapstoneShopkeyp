// The admin controllers
import User from '../models/user.js';
import Item from '../models/item.js';
import Transaction from '../models/transaction.js';
import ExpressError from '../expressError.js';
import jsonschema from 'jsonschema';
import itemUpdateSchema from '../schemas/itemUpdate.json' assert { type: "json" };

export const getData = async (req, res, next) => {
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
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

export const getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.getByUsername(req.params.username);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const makeUserAdmin = async (req, res, next) => {
  try {
    const user = await User.toggleIsAdmin(req.params.username, false);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const removeUserRights = async (req, res, next) => {
  try {
    const user = await User.toggleIsAdmin(req.params.username, true);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.all();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.get(req.params.itemId);
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const item = await Item.add(req.body);
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

export const updateItem = async (req, res, next) => {
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
      (key) => fields[key] === undefined && delete fields[key],
    );

    if (Object.keys(fields).length === 0) {
      throw new ExpressError('Unauthorized or blank fields.', 401);
    }

    const item = await Item.update(req.params.itemId, fields);

    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.all();
    return res.json(transactions);
  } catch (err) {
    return next(err);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.get(req.params.transactionId);
    return res.json(transaction);
  } catch (err) {
    return next(err);
  }
};
