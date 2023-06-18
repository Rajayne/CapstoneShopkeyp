/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */

import express from 'express';

import { authenticateJWT, ensureCorrectUserOrAdmin, requireLogin, } from '../middleware/auth.js';
import {
  createNewAdminUser, getUserById, toggleAdmin, updateUserActiveStatus, updateUserStatus
} from '../controllers/users.controller.js';

const router = express.Router();

/* Create new user, ensure Admin */
router.get('/', authenticateJWT, requireLogin, createNewAdminUser);

router.get('/:username', authenticateJWT, requireLogin, getUserById);

router.patch('/:username/edit', requireLogin, ensureCorrectUserOrAdmin, toggleAdmin);

router.patch('/:username/deactivate', requireLogin, ensureCorrectUserOrAdmin, updateUserActiveStatus);

router.patch('/:username/reactivate', requireLogin, ensureCorrectUserOrAdmin, updateUserStatus);

export default router;
