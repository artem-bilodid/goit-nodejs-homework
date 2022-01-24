const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const updateInfo = await Contact.updateOne({ _id: contactId }, body);

    console.log(updateInfo);

    if (!updateInfo?.matchedCount) {
      return res.status(404).json({ message: "Not found" });
    }

    if (!updateInfo?.modifiedCount) {
      return res.status(400).json({ message: "No changes to apply" });
    }

    res.json(updateInfo);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
