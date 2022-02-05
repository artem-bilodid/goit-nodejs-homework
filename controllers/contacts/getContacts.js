const { Contact } = require('../../models');

const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const { _id } = req.user;

    const contacts =
      favorite === 'true' || favorite === 'false'
        ? await Contact.find({ owner: _id, favorite }).skip(skip).limit(Number(limit))
        : await Contact.find({ owner: _id }).skip(skip).limit(Number(limit));
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
