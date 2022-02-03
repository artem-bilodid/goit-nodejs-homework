const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const deleteContact = require('./deleteContact');
const updateContact = require('./updateContact');
const updateContactFavoriteById = require('./updateContactFavoriteById');

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactFavoriteById,
};
