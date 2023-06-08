const db = require('../db');
const User = require('./user');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testAdmin,
  testUser,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('User.authenticate', () => {
  test('works', async () => {
    const user = await User.authenticate('user1', 'userPass1');
    expect(user).toEqual({
      username: 'user1',
      isAdmin: false,
    });
  });
});

describe('User.all', () => {
  test('gets all users', async () => {
    console.log('VARIABLES 2', testAdmin, testUser);
    const users = await User.all();
    expect(users).toEqual([testAdmin, testUser]);
  });
});
