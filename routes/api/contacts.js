const express = require('express');
const router = express.Router();

const {
  createContactValidation,
  updateContactValidation,
  contactIdParamValidation,
  contactFavoriteValidation,
} = require('../../middlewares/validation/contacts');

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactFavoriteById,
} = require('../../controllers/contacts');

router.get('/', getContacts);

router.get('/:contactId', contactIdParamValidation, getContactById);

router.post('/', createContactValidation, addContact);

router.delete('/:contactId', contactIdParamValidation, deleteContact);

router.put('/:contactId', [contactIdParamValidation, updateContactValidation], updateContact);

router.delete('/:contactId', contactIdParamValidation, deleteContact);

router.patch(
  '/:contactId/favorite',
  [contactIdParamValidation, contactFavoriteValidation],
  updateContactFavoriteById,
);

module.exports = router;
