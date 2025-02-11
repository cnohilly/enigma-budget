import express from 'express';
import { getAllUsers, queryUsers } from '../controllers/usersController.js';
const router = express.Router();

// Route to get all users
router.get('/all', getAllUsers);

// Route to query users based on criteria
router.get('/search', queryUsers);

export default router;