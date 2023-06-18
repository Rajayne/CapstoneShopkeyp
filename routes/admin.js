/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
import express from 'express';

import { authenticateJWT, requireLogin, requireAdmin } from '../middleware/auth.js';

import { updateUserActiveStatus, updateUserStatus } from '../controllers/users.controller.js';
import {
  createItem, getAllItems, getAllTransactions, getAllUsers,
  getData, getItemById, getTransactionById, getUserByUsername,
  makeUserAdmin, removeUserRights, updateItem
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get(
  '/',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getData
);

router.get(
  '/users',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getAllUsers
);

router.get(
  '/users/:username/',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getUserByUsername
);

router.patch(
  '/users/:username/deactivate',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  updateUserActiveStatus
);

router.patch(
  '/users/:username/reactivate',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  updateUserStatus
);

router.patch(
  '/users/:username/makeAdmin',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  makeUserAdmin
);

router.patch(
  '/users/:username/removeAdmin',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  removeUserRights
);

router.get(
  '/items',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getAllItems
);

router.get(
  '/items/:itemId',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getItemById
);

router.post(
  '/items/new',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  createItem
);

router.patch(
  '/items/:itemId/edit',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  updateItem
);

router.get(
  '/transactions',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getAllTransactions
);

router.get(
  '/transactions/:transactionId',
  authenticateJWT,
  requireLogin,
  requireAdmin,
  getTransactionById
);

export default router;
