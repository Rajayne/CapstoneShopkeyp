/* eslint-disable import/extensions */
import express from 'express';

import { requireLogin } from '../middleware/auth.js';
import { userLogin, userLogout, userRegister } from '../controllers/auth.contoller.js';

const router = new express.Router();

router.post('/logout', requireLogin, userLogout);

/** POST /auth/token:  { username, password } => { token }
 * User recieves auth token after logging in */
router.post('/login', userLogin);

/** POST /auth/register: { user } => { token }
 * New user recieves login token after registering */
router.post('/register', userRegister);

export default router;
