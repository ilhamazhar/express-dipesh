import express from 'express';
import validateToken from '../middleware/validateTokenHandler.js';
import {
  getAllContacts,
  createContact,
  getContact,
  editContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

// Start token validation
router.use(validateToken);
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContact).put(editContact).delete(deleteContact);
// End token validation

export default router;
