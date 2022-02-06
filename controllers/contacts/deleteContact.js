const { Contact } = require('../../models');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndRemove(contactId);

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
