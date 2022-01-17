const express = require("express");
const router = express.Router();

const { contactValidation } = require("../../middlewares/validation/contacts");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", contactValidation, addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation, updateContact);

module.exports = router;
