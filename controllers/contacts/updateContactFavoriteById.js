const { Contact } = require('../../models');

const updateContactFavoriteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    console.log(updatedContact);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactFavoriteById;
