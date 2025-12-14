import express from 'express';
import { getRoutes, createRoute, deleteRoute, updateRoute } from '../controllers/routeController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRoutes);               // Public: Read
router.post('/', protect, createRoute);   // Admin: Create
router.put('/:id', protect, updateRoute); // Admin: Update (New!)
router.delete('/:id', protect, deleteRoute); // Admin: Delete

export default router;