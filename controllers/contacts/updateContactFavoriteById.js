const { Contact } = require('../../models');

const updateContactFavoriteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactFavoriteById;
