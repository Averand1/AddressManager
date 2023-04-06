// Define the contacts array to hold the list of contacts
const contacts = [];

// Get the HTML elements
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const mobileInput = document.querySelector("#mobile");
mobileInput.type = "number";
const searchInput = document.querySelector("#search");
const contactList = document.querySelector("#contact-list");

// Add a new contact to the address book
function addContact() {
  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();

  // Check if the mobile number already exists
  const existingContact = contacts.find(
    (contact) => contact.mobile === mobile
  );
  if (existingContact) {
    alert("Mobile number already exists.");
    return;
  }

  // Create a new contact object and add it to the contacts array
  const contact = { name, mobile };
  contacts.push(contact);

  // Sort the contacts array by name in ascending order
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  // Clear the input fields and display the updated contacts
  nameInput.value = "";
  mobileInput.value = "";
  displayContacts();
}

// Display all contacts in the address book
function displayContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const mobileCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameCell.innerText = contact.name;
    mobileCell.innerText = contact.mobile;

    editButton.innerText = "Edit";
    editButton.className = "edit";
    editButton.onclick = () => editContact(contact);

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => deleteContact(contact);

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(mobileCell);
    row.appendChild(actionCell);

    contactList.appendChild(row);
  });
}

// Edit a contact in the address book
function editContact(contact) {
  // Set the input fields to the contact's values
  nameInput.value = contact.name;
  mobileInput.value = contact.mobile;

  // Remove the contact from the contacts array and display the updated contacts
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  displayContacts();
}

// Delete a contact from the address book
function deleteContact(contact) {
  // Remove the contact from the contacts array and display the updated contacts
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  displayContacts();
}

// Filter the contacts based on the search term
function filter() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.mobile.includes(searchTerm)
  );
  displayFilteredContacts(filteredContacts);
}

// Display the filtered contacts in the table
function displayFilteredContacts(filteredContacts) {
  contactList.innerHTML = "";
  filteredContacts.forEach((contact) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const mobileCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameCell.innerText = contact.name;
    mobileCell.innerText = contact.mobile;

    editButton.innerText = "Edit";
    editButton.className = "edit";
    editButton.onclick = () => editContact(contact);

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => deleteContact(contact);

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(mobileCell);
    row.appendChild(actionCell);

    contactList.appendChild(row);

});
}

// Add event listeners to the form and search input
form.addEventListener("submit", (event) => {
event.preventDefault();
addContact();
});

searchInput.addEventListener("input", () => {
filter();
});

// Display all contacts when the page loads
displayContacts();
