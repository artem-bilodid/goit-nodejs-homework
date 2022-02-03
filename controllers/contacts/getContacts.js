const { Contact } = require("../../models");

const getContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
