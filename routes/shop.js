/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
import express from 'express';
import { authenticateJWT, requireLogin, ensureCorrectUserOrAdmin } from '../middleware/auth.js';
import { createPuchaseItem, getItemByID, getItems } from '../controllers/shop.controller.js';

const router = express.Router();

router.get('/', authenticateJWT, requireLogin, getItems);

router.get('/item/:itemId', authenticateJWT, requireLogin, getItemByID);

router.get('/item/:itemId/purchase', authenticateJWT, requireLogin, ensureCorrectUserOrAdmin, createPuchaseItem);

export default router;
