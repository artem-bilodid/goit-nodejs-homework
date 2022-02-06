const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { body }, { new: true });

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
