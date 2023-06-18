/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';

import createToken from './token.js';
import { SECRET_KEY } from '../config.js';

describe('createToken', () => {
  test('works: not admin', () => {
    const token = createToken({ username: 'test', is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: 'test',
      isAdmin: false,
    });
  });

  test('works: admin', () => {
    const token = createToken({ username: 'test', isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: 'test',
      isAdmin: true,
    });
  });

  test('works: default no admin', () => {
    const token = createToken({ username: 'test' });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: 'test',
      isAdmin: false,
    });
  });
});
