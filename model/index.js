const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: generateId } = require("uuid");

const listContacts = async () => {
  try {
    const fileBuffer = await fs.readFile(contactsPath);
    const contacts = JSON.parse(fileBuffer);
    return contacts;
  } catch (error) {
    throw new Error(`Error on reading contacts file: ${error.message}`);
  }
};

const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    throw new Error(`Error on writing contacts file: ${error.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === String(contactId));
    return contact;
  } catch (error) {
    throw new Error(`Error on getting contacts by ID: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter((c) => c.id !== String(contactId));
    const removed = contacts.length - filteredContacts.length;
    if (removed > 0) {
      await writeContacts(filteredContacts);
    }
    return { removed };
  } catch (error) {
    throw new Error(`Error on deleting contact by ID: ${error.message}`);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: generateId(),
      ...body,
    };
    await writeContacts(contacts.concat(newContact));
    return newContact;
  } catch (error) {
    throw new Error(`Error on adding new contact: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(String(contactId));
    if (!contact) return null;

    const newContact = {
      id: contact.id,
      ...body,
    };
    await writeContacts(
      contacts.map((c) => (c.id === contactId ? newContact : c))
    );
    return newContact;
  } catch (error) {
    throw new Error(`Error on updating a contact: ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
