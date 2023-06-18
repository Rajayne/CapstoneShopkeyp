/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config.js';

/** return signed JWT from user data. */
export default function createToken(user) {
  const payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}
