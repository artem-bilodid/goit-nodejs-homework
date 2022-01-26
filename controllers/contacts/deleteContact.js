const { Contact } = require('../../models');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { deletedCount } = await Contact.findByIdAndRemove(contactId);

    if (!deletedCount) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
