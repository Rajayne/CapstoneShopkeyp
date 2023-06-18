/* eslint-disable import/extensions */
// The shop controllers
import Item from '../models/item.js';
import User from '../models/user.js';

export const getItems = async (req, res, next) => {
  try {
    const items = await Item.purchasable();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
};

export const getItemByID = async (req, res, next) => {
  try {
    const item = await Item.get(req.params.itemId);
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

export const createPuchaseItem = async (req, res, next) => {
  try {
    const transaction = await User.purchase(req.body);
    return res.json(transaction);
  } catch (err) {
    return next(err);
  }
};
