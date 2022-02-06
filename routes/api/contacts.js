const express = require('express');
const router = express.Router();

const {
  createContactValidation,
  updateContactValidation,
  contactIdParamValidation,
  contactFavoriteValidation,
  ownerUserValidation,
} = require('../../middlewares/validation/contacts');

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactFavoriteById,
} = require('../../controllers/contacts');

const { auth } = require('../../middlewares/auth');

router.get('/', auth, getContacts);

router.get('/:contactId', [auth, contactIdParamValidation, ownerUserValidation], getContactById);

router.post('/', [auth, createContactValidation, ownerUserValidation], addContact);

router.delete('/:contactId', [auth, contactIdParamValidation, ownerUserValidation], deleteContact);

router.put(
  '/:contactId',
  [auth, contactIdParamValidation, updateContactValidation, ownerUserValidation],
  updateContact,
);

router.delete('/:contactId', [auth, contactIdParamValidation, ownerUserValidation], deleteContact);

router.patch(
  '/:contactId/favorite',
  [auth, contactIdParamValidation, contactFavoriteValidation, ownerUserValidation],
  updateContactFavoriteById,
);

module.exports = router;
