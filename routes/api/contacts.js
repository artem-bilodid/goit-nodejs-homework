const express = require("express");
const router = express.Router();

const {
  contactValidation,
  getContactByIdValidation,
} = require("../../middlewares/validation/contacts");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:contactId", getContactByIdValidation, getContactById);

router.post("/", contactValidation, addContact);

router.delete("/:contactId", getContactByIdValidation, deleteContact);

router.put(
  "/:contactId",
  [getContactByIdValidation, contactValidation],
  updateContact
);

module.exports = router;
