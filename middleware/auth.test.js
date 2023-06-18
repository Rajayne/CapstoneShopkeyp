/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';

import ExpressError from '../expressError.js';

import {
  authenticateJWT,
  requireLogin,
  requireAdmin,
  ensureCorrectUserOrAdmin,
} from './auth.js';

import { SECRET_KEY } from '../config.js';

const testJwt = jwt.sign({ username: 'test', isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: 'test', isAdmin: false }, 'wrong');

describe('authenticateJWT', () => {
  test('works: via header', () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: 'test',
        isAdmin: false,
      },
    });
  });

  test('works: no header', () => {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test('works: invalid token', () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe('requireLogin', () => {
  test('works', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: 'test', is_admin: false } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    requireLogin(req, res, next);
  });

  test('unauth if no login', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = (err) => {
      expect(err instanceof ExpressError).toBeTruthy();
    };
    requireLogin(req, res, next);
  });
});

describe('requireAdmin', () => {
  test('works', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: 'test', isAdmin: true } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    requireAdmin(req, res, next);
  });

  test('unauth if not admin', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: 'test', isAdmin: false } } };
    const next = (err) => {
      expect(err instanceof ExpressError).toBeTruthy();
    };
    requireAdmin(req, res, next);
  });

  test('unauth if anon', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = (err) => {
      expect(err instanceof ExpressError).toBeTruthy();
    };
    requireAdmin(req, res, next);
  });
});

describe('ensureCorrectUserOrAdmin', () => {
  test('works: admin', () => {
    expect.assertions(1);
    const req = { params: { username: 'test' } };
    const res = { locals: { user: { username: 'admin', isAdmin: true } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });

  test('works: same user', () => {
    expect.assertions(1);
    const req = { params: { username: 'test' } };
    const res = { locals: { user: { username: 'test', isAdmin: false } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });

  test('unauth: mismatch', () => {
    expect.assertions(1);
    const req = { params: { username: 'wrong' } };
    const res = { locals: { user: { username: 'test', isAdmin: false } } };
    const next = (err) => {
      expect(err instanceof ExpressError).toBeTruthy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });

  test('unauth: if anon', () => {
    expect.assertions(1);
    const req = { params: { username: 'test' } };
    const res = { locals: {} };
    const next = (err) => {
      expect(err instanceof ExpressError).toBeTruthy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
});
