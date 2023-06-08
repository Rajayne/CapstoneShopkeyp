const db = require('../db');
const User = require('./user');
const ExpressError = require('../expressError');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  user1,
  admin1,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('authenticate', () => {
  test('works', async () => {
    const user = await User.authenticate('user1', 'userPass1');
    expect(user).toEqual({
      username: 'user1',
      isAdmin: false,
    });
  });
});
