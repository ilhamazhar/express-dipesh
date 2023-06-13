const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const {
  getAllContacts,
  createContact,
  getContact,
  editContact,
  deleteContact,
} = require('./../controllers/contactController');

// Start token validation
router.use(validateToken);
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContact).put(editContact).delete(deleteContact);
// End token validation

module.exports = router;
