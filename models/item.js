const db = require('../db');
const ExpressError = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Item {
  constructor({
    itemUuid,
    itemId,
    name,
    description,
    itemImage,
    price,
    stock,
    purchasable,
    createdBy,
    dateCreated,
  }) {
    this.itemUuid = itemUuid;
    this.itemId = itemId;
    this.name = name;
    this.description = description;
    this.itemImage = itemImage;
    this.price = price;
    this.stock = stock;
    this.purchasable = purchasable;
    this.createdBy = createdBy;
    this.dateCreated = dateCreated;
  }
}

module.exports = Item;
