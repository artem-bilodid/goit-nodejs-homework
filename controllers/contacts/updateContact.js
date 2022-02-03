const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });

    console.log(updatedContact);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
