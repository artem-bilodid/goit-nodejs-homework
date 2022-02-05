const { Contact } = require('../../models');

const addContact = async (req, res, next) => {
  try {
    const { body } = req;
    const { _id } = req.user;
    const newContact = await Contact.create({ ...body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
