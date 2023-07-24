/* eslint-disable no-console */
require('colors');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const PORT = +process.env.PORT || 5000;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  if (process.env.DATABASE) {
    return process.env.DATABASE;
  }
  return process.env.NODE_ENV === 'test'
    ? `postgresql://${process.env.USER}:${process.env.PASS}@localhost:5432/shopkeyp_test`
    : `${process.env.DATABASE}` ||
        `postgresql://${process.env.USER}:${process.env.PASS}@localhost:5432/shopkeyp`;
}

// Speed up bcrypt during tests with lower salt
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 13;

console.log('Shopkeyp Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database:'.yellow, getDatabaseUri());
console.log('---');

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
