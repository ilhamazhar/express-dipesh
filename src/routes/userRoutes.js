import express from 'express';
import validateToken from './../middleware/validateTokenHandler.js';
import {
  registerUser,
  loginUser,
  currentUser,
  getAllUsers,
  editUser,
} from './../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);
router.get('/', validateToken, getAllUsers);
router.put('/:id', validateToken, editUser);

export default router;
