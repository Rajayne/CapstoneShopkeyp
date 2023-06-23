/* eslint-disable import/extensions */
// The shop controllers
const Item = require('../models/item.js');
const User = require('../models/user.js');

const getItems = async (req, res, next) => {
  try {
    const items = await Item.all();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
};

const getItemByID = async (req, res, next) => {
  try {
    const item = await Item.get(req.params.itemId);
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

const createPuchaseItem = async (req, res, next) => {
  try {
    const transaction = await User.purchase(req.body);
    return res.json(transaction);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getItems, getItemByID, createPuchaseItem };
