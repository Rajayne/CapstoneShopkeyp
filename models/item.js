/* eslint-disable comma-dangle */
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

  static async all() {
    const results = await db.query(
      `SELECT
        item_uuid AS "itemUuid",
        item_id AS "itemId",
        name,
        description,
        item_image AS "itemImage",
        price,
        stock,
        purchasable,
        created_by AS "createdBy",
        date_created AS "dateCreated"
      FROM items
      ORDER BY name`
    );
    return results.rows.map((i) => new Item(i));
  }

  static async purchasable() {
    const results = await db.query(
      `SELECT
        item_uuid AS "itemUuid",
        item_id AS "itemId",
        name,
        description,
        item_image AS "itemImage",
        price,
        stock,
        purchasable,
        created_by AS "createdBy",
        date_created AS "dateCreated"
      FROM items
      WHERE purchasable = true
      ORDER BY name`
    );
    const items = results.rows;
    if (!items) {
      return 'No purchasable shop items.';
    }

    return results.rows.map((i) => new Item(i));
  }

  static async get(itemId) {
    const results = await db.query(
      `SELECT 
        item_uuid AS "itemUuid",
        item_id AS "itemId", 
        name,
        description,
        item_image AS "itemImage",
        price,
        stock,
        purchasable,
        created_by AS "createdBy",
        date_created AS "dateCreated"
       FROM items
       WHERE item_id = $1`,
      [itemId]
    );
    const item = results.rows[0];

    if (item === undefined) {
      throw new ExpressError(`No such item: ${itemId}`, 404);
    }

    return new Item(item);
  }

  static async add({
    itemUuid,
    name,
    description,
    itemImage,
    price,
    stock,
    purchasable,
    createdBy,
    dateCreated,
  }) {
    if (!name || !description) {
      throw new ExpressError('Invalid data', 400);
    }
    const results = await db.query(
      `INSERT INTO items
         (item_uuid,
         name, 
         description, 
         item_image, 
         price, 
         stock, 
         purchasable, 
         created_by, 
         date_created)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING 
         item_uuid AS "itemUuid",
         item_id AS "itemId",
         name, 
         description, 
         item_image AS "itemImage", 
         price, 
         stock, 
         purchasable, 
         created_by AS "createdBy", 
         date_created AS "dateCreated"`,
      [
        itemUuid || 0,
        name,
        description,
        itemImage,
        price,
        stock,
        purchasable || 0,
        createdBy,
        dateCreated,
      ]
    );
    const item = results.rows[0];
    if (item === undefined) {
      throw new ExpressError('Invalid data', 400);
    }

    return new Item(item);
  }

  static async update(itemId, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      itemImage: 'item_image',
    });

    const itemIdIdx = `$${values.length + 1}`;

    const querySql = `UPDATE items 
                      SET ${setCols} 
                      WHERE item_id = ${itemIdIdx}
                      RETURNING name`;
    const result = await db.query(querySql, [...values, itemId]);

    const item = result.rows[0];

    if (!item) throw new ExpressError(`Item does not exist: ${itemId}`, 404);

    return `You have successfully updated ${item.name}'s details.`;
  }
}

module.exports = Item;
