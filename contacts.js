import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading contacts: ", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = await contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.error("Error reading contacts: ", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = await contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1); //returns what is inside the spliced method
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); //JSON.stringify(value, replacer, space)
    return deletedContact;
  } catch (error) {
    console.error("Error reading contacts: ", error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContacts = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = [...contacts, newContacts];
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContacts;
  } catch (error) {
    console.error("Error reading contacts: ", error.message);
  }
};

export { listContacts, getContactById, removeContact, addContact };
