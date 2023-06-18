/* eslint-disable no-console */
// const { user, password } = require('../dbPassword');
import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

export const PORT = +process.env.PORT || 5000;

// Use dev database, testing database, or via env var, production database
export function getDatabaseUri() {
  return process.env.NODE_ENV === 'test'
    ? `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/shopkeyp_test`
    : `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`;
}

// Speed up bcrypt during tests with lower salt
export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 13;

console.log('Jobly Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database:'.yellow, getDatabaseUri());
console.log('---');
