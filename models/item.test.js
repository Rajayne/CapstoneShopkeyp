/* eslint-disable comma-dangle */
const db = require('../db');
const User = require('./user');
const Item = require('./item');
const ExpressError = require('../expressError');

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

let testAdmin;
let testItem;
let testItem2;

const newItem = {
  name: 'newItem',
  description: 'newItem description',
  itemImage: 'newItem.png',
  price: 10,
  stock: 1,
  purchasable: false,
};

beforeAll(async () => {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM items');

  const admin = await db.query(
    `INSERT INTO users 
      (username, password, profile_image, is_admin) 
    VALUES 
      ('admin1', $1, 'adminProfile.png', true) 
    RETURNING 
      user_id AS "userId",
      username,
      profile_image AS "profileImage",
      balance,
      is_admin AS "isAdmin",
      active,
      date_created AS "dateCreated"`,
    ['adminPass1']
  );

  [testAdmin] = await admin.rows.map((a) => new User(a));

  const item = await db.query(
    `INSERT INTO items 
      (name, description, item_image, price, created_by) 
    VALUES 
      ('item1', 'description1',  'item1.png', 5, $1) 
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
    [testAdmin.userId]
  );

  [testItem] = await item.rows.map((i) => new Item(i));

  const item2 = await db.query(
    `INSERT INTO items 
      (item_uuid, name, description, item_image, price, created_by) 
    VALUES 
      ($1, 'item1', 'description1',  'item1.png', 5, $2) 
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
    [testItem.itemUuid, testAdmin.userId]
  );

  [testItem2] = await item2.rows.map((i) => new Item(i));
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('Item Model Tests', () => {
  test('creates testAdmin, testItem and testItem2 variables', async () => {
    expect(testAdmin instanceof User).toBeTruthy();
    expect(testItem instanceof Item).toBeTruthy();
    expect(testItem2 instanceof Item).toBeTruthy();
  });

  describe('Item.all', () => {
    test('gets all items', async () => {
      const items = await Item.all();
      expect(items).toEqual([testItem, testItem2]);
    });
  });

  describe('Item.get(id)', () => {
    test('gets item by id', async () => {
      const item = await Item.get(testItem.itemId);
      expect(item).toEqual(testItem);
    });
    test('returns error if user does not exist', async () => {
      try {
        await Item.get(0);
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  describe('Item.add', () => {
    // test('adds new item', async () => {
    //   newItem.createdBy = testAdmin.userId;
    //   const item = await Item.add(newItem);
    //   expect(item instanceof Item).toBeTruthy();
    //   expect(item.name).toEqual('newItem');
    // });
    // test('adds new item to existing itemUuid', async () => {
    //   newItem.itemUuid = testItem.itemUuid;
    //   newItem.createdBy = testAdmin.userId;
    //   const item = await Item.add(newItem);
    //   expect(item instanceof Item).toBeTruthy();
    //   expect(item.itemUuid).toEqual(testItem.itemUuid);
    // });
    test('returns error if missing fields', async () => {
      try {
        await Item.add({ name: 'newItem2' });
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  // describe('Item.update', () => {
  //   const updateData = {
  //     name: 'newItem1',
  //     price: 10,
  //   };
  //   test('updates item data', async () => {
  //     const res = await Item.update(testItem.itemId, updateData);
  //     expect(res).toEqual("You have successfully updated newItem1's details.");
  //   });
  //   test('returns error if item does not exist', async () => {
  //     try {
  //       await Item.update(0, {
  //         name: 'newItem',
  //       });
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  //   test('returns error if no data', async () => {
  //     expect.assertions(1);
  //     try {
  //       await Item.update(testItem.itemId, {});
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
});
