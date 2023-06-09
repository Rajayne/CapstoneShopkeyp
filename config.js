/* eslint-disable no-console */
const { user, password } = require('../dbPassword');

require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

const PORT = +process.env.PORT || 3000;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === 'test'
    ? `postgresql://${user}:${password}@localhost:5432/shopkeyp_test`
    : `postgresql://${user}:${password}@localhost:5432/shopkeyp`;
}

// Speed up bcrypt during tests with lower salt
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 13;

console.log('Jobly Config:'.green);
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