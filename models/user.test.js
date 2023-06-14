/* eslint-disable comma-dangle */
const db = require('../db');
const User = require('./user');
const Item = require('./item');
const Transaction = require('./transaction');
const ExpressError = require('../expressError');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUser,
  testAdmin,
  testItem,
  testTransaction,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('User Model Tests', () => {
  describe('Creates User Model Variables', () => {
    test('works', async () => {
      console.log('TESTADMIN', testAdmin);
      console.log('TESTUSER', testUser);
      console.log('TESTITEM', testItem);
      console.log('TESTTRANSACTION', testTransaction);
      expect(testAdmin instanceof User).toBeTruthy();
      expect(testUser instanceof User).toBeTruthy();
      expect(testItem instanceof Item).toBeTruthy();
      expect(testTransaction instanceof Transaction).toBeTruthy();
    });
  });
  // describe('User.authenticate', () => {
  //   test('works', async () => {
  //     const user = await User.authenticate('user1', 'userPass1');
  //     expect(user).toEqual({
  //       username: 'user1',
  //       isAdmin: false,
  //     });
  //   });
  //   test('returns error if wrong username/password', async () => {
  //     try {
  //       await User.authenticate('user1', 'userPass2');
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
  // describe('User.register', () => {
  //   test('registers a new user', async () => {
  //     const user = await User.register('user2', 'userPass2');
  //     expect(user).toEqual({
  //       username: 'user2',
  //       isAdmin: false,
  //     });
  //   });
  //   test('returns error if username already taken', async () => {
  //     try {
  //       await User.register('user1', 'userPass1');
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
  // describe('User.all', () => {
  //   test('gets all users', async () => {
  //     const users = await User.all();
  //     expect(users).toEqual([testAdmin, testUser]);
  //   });
  // });
  // describe('User.getById', () => {
  //   test('gets user by id', async () => {
  //     testUser.transactions.push(testTransaction.transactionId);
  //     testUser.inventory.push(testItem.itemId);
  //     const user = await User.getById(testUser.userId);
  //     expect(user).toEqual(testUser);
  //   });
  //   test('displays user transactions on model', async () => {
  //     const user = await User.getById(testUser.userId);
  //     expect(user.transactions[0]).toEqual(testTransaction.transactionId);
  //   });
  //   test('displays user items on model', async () => {
  //     const user = await User.getById(testUser.userId);
  //     expect(user.inventory[0]).toEqual(testItem.itemId);
  //   });
  //   test('returns error if user does not exist', async () => {
  //     try {
  //       await User.getById(0);
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
  // describe('User.getByUsername', () => {
  //   test('gets user by username', async () => {
  //     const user = await User.getByUsername(testUser.username);
  //     expect(user).toEqual(testUser);
  //   });
  //   test('displays user transactions on model', async () => {
  //     const user = await User.getByUsername(testUser.username);
  //     expect(user.transactions[0]).toEqual(testTransaction.transactionId);
  //   });
  //   test('displays user items on model', async () => {
  //     const user = await User.getByUsername(testUser.username);
  //     expect(user.inventory[0]).toEqual(testItem.itemId);
  //   });
  //   test('returns error if user does not exist', async () => {
  //     try {
  //       await User.getByUsername('notUser1');
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
  // describe('User.update', () => {
  //   const updateData = {
  //     username: 'newUser1',
  //   };
  //   test('updates user data using user id', async () => {
  //     const res = await User.update(testUser.userId, updateData);
  //     expect(res).toEqual("You have successfully updated newUser1's profile.");
  //   });
  //   test('updates user data using username', async () => {
  //     const res = await User.update(testUser.username, updateData);
  //     expect(res).toEqual("You have successfully updated newUser1's profile.");
  //   });
  //   test('updates user password', async () => {
  //     const res = await User.update(testAdmin.userId, {
  //       password: 'newAdminPass1',
  //     });
  //     expect(res).toEqual("You have successfully updated admin1's profile.");
  //     const found = await db.query(
  //       "SELECT * FROM users WHERE username = 'admin1'"
  //     );
  //     expect(found.rows.length).toEqual(1);
  //     expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
  //   });
  //   test('returns error if user does not exist', async () => {
  //     try {
  //       await User.update(0, {
  //         username: 'user1',
  //       });
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
  // describe('User.toggleIsAdmin', () => {
  //   test('gives admin permissions', async () => {
  //     const res = await User.toggleIsAdmin(testUser.userId, testUser.isAdmin);
  //     expect(res).toEqual(
  //       'You have successfully given user1 admin permissions.'
  //     );
  //   });
  //   test('removes admin permissions', async () => {
  //     const res = await User.toggleIsAdmin(testAdmin.userId, testAdmin.isAdmin);
  //     expect(res).toEqual(
  //       'You have successfully taken admin1 admin permissions.'
  //     );
  //   });
  // });
  // describe('User.toggleActive', () => {
  //   test('deactivates user account', async () => {
  //     const res = await User.toggleActive(testUser.userId, testUser.active);
  //     expect(res).toEqual("You have successfully deactivated user1's account.");
  //   });
  //   test('reactivates user account', async () => {
  //     await User.toggleActive(testUser.userId, testUser.active);
  //     const res = await User.toggleActive(testUser.userId, false);
  //     expect(res).toEqual("You have successfully reactivated user1's account.");
  //   });
  //   test('returns error if user does not exist', async () => {
  //     expect.assertions(1);
  //     try {
  //       await User.toggleActive(0);
  //     } catch (err) {
  //       expect(err instanceof ExpressError).toBeTruthy();
  //     }
  //   });
  // });
  // describe('User.inInventory', () => {
  //   test('check for items in user inventory', async () => {
  //     const check = await User.inInventory(testUser.userId, testItem.itemId);
  //     expect(check).toEqual(true);
  //   });
  // });
  // describe('User.updateInventory', () => {
  //   test('update quantity in user inventory', async () => {
  //     const updateQuantity = await User.updateInventory(
  //       testUser.userId,
  //       testItem.itemId,
  //       2
  //     );
  //     expect(updateQuantity).toEqual(4);
  //   });
  // });
  // describe('User.purchase', () => {
  //   test('purchase adds item to user inventory and creates transaction', async () => {
  //     const transaction = await User.purchase({
  //       toUser: testUser.userId,
  //       action: 'purchase',
  //       itemId: testItem.itemId,
  //       quantity: 2,
  //       total: 10,
  //     });
  //     expect(transaction instanceof Transaction).toBeTruthy();
  //   });
  // });
});
