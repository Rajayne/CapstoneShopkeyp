/* eslint-disable import/extensions */
import request from 'supertest';

import app from './app.js';
import db from './db.js';

test('not found for site 404', async () => {
  const resp = await request(app).get('/no-such-path');
  expect(resp.statusCode).toEqual(404);
});

afterAll(() => {
  db.end();
});
