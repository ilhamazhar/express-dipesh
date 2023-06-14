import asyncHandler from 'express-async-handler';
import Contact from './../models/contactModel.js';

// Get all contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ message: 'All Contacts', data: contacts });
});

// Create a contact
const createContact = asyncHandler(async (req, res) => {
  console.log(`The request body is`, req.body);
  const { name, username, email, phone } = req.body;
  if (!name || !username || !email || !phone) {
    res.status(400);
    throw new Error('All field are mandatory');
  }
  // Check contact available
  const contactAvailable = await Contact.findOne({ email, username });
  if (contactAvailable) {
    res.status(400);
    throw new Error('Contact already registered!');
  }

  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    username,
    email,
    phone,
  });
  res.status(201).json({ message: 'Contact created.', data: contact });
});

// Get a contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`User don't have permission to get this contact`);
  }

  res
    .status(200)
    .json({ message: `Get a contact for ${contact.name}`, data: contact });
});

// Edit a contact
const editContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`User don't have permission to update this contact`);
  }

  const editedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `Edit a contact for ${req.params.id}`,
    data: editedContact,
  });
});

// Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  // process.exit();
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`User don't have permission to delete this contact`);
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: `Delete a contact for ${req.params.id}`,
  });
});

export {
  getAllContacts,
  createContact,
  getContact,
  editContact,
  deleteContact,
};
