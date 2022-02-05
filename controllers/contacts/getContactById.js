const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
