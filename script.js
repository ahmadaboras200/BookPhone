"use strict";

// Initial contacts data
let users = [
    {
        "username": "Leo",
        "phone": "0502884200",
        "address": "123 Main St",
        "email": "leo@example.com",
        "image": "img/img1.png"
    },
    {
        "username": "Abo Jood",
        "phone": "0502552500",
        "address": "456 Elm St",
        "email": "abojood@example.com",
        "image": "img/img2.png"
    },
    {
        "username": "Abo Eid",
        "phone": "0503662566",
        "address": "789 Oak St",
        "email": "abo.eid@example.com",
        "image": "img/img3.png"
    }
];

// DOM Elements
const list = document.querySelector(".contacts-list");
const modalEdit = document.getElementById('myModal');
const modalAdd = document.getElementById('addModal');
const closeBtns = document.querySelectorAll('.close');
const addNewContactBtn = document.querySelector('.add-new-contact');

// Function to populate contacts list
function populateContacts() {
    list.innerHTML = ''; // Clear existing list

    users.forEach((user, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.className = "contact";
        contactDiv.innerHTML = `
            <img src="${user.image}" alt="Logo ${index + 1}" width="50">
            <div class="contact-details">
                <h3>${user.username}</h3>
                <p>Phone: ${user.phone}</p>
                <img class="info-img" src="img/information.png" alt="Information" width="35" onclick="openEditModal(${index})">
                <img src="img/delete.png" alt="Delete" width="35" onclick="deleteContact(${index})">
            </div>`;
        list.appendChild(contactDiv);
    });
}

// Function to open edit modal
function openEditModal(index) {
    const usernameInput = document.getElementById('inputUserName');
    const phoneInput = document.getElementById('inputUserPhone');
    const addressInput = document.getElementById('inputUserAddress');
    const emailInput = document.getElementById('inputUserEmail');

    usernameInput.value = users[index].username;
    phoneInput.value = users[index].phone;
    addressInput.value = users[index].address || '';
    emailInput.value = users[index].email || '';
    usernameInput.setAttribute('data-index', index);

    modalEdit.style.display = 'block';
}

// Function to open add modal
function openAddModal() {
    modalAdd.style.display = 'block';
}

// Function to close modals
function closeModal() {
    modalEdit.style.display = 'none';
    modalAdd.style.display = 'none';
}

// Function to save changes
function saveChanges() {
    const usernameInput = document.getElementById('inputUserName').value;
    const phoneInput = document.getElementById('inputUserPhone').value;
    const addressInput = document.getElementById('inputUserAddress').value;
    const emailInput = document.getElementById('inputUserEmail').value;
    const index = parseInt(document.getElementById('inputUserName').getAttribute('data-index'));

    users[index].username = usernameInput;
    users[index].phone = phoneInput;
    users[index].address = addressInput;
    users[index].email = emailInput;

    closeModal();
    populateContacts();
}

// Function to validate and add new contact
function validateAndAdd() {
    const newUsernameInput = document.getElementById('inputNewUserName').value.trim();
    const newPhoneInput = document.getElementById('inputNewUserPhone').value.trim();
    const newAddressInput = document.getElementById('inputNewUserAddress').value.trim();
    const newEmailInput = document.getElementById('inputNewUserEmail').value.trim();

    // Check if newPhoneInput contains non-numeric characters
    if (!(/^\d+$/.test(newPhoneInput))) {
        alert("Phone number should contain only digits.");
        return;
    }

    // Check if newUsernameInput contains numeric characters
    if (!isNaN(newUsernameInput)) {
        alert("Username should not contain numeric characters.");
        return;
    }

    // Check if newPhoneInput length is exactly 10 digits
    if (newPhoneInput.length !== 10) {
        alert("Phone number should be exactly 10 digits.");
        return;
    }

    const usernameExists = users.some(user => user.username === newUsernameInput);
    const phoneExists = users.some(user => user.phone === newPhoneInput);

    if (usernameExists) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    if (phoneExists) {
        alert("Phone number already exists. Please choose a different phone number.");
        return;
    }

    const newImage = getNextAvailableImage();

    const newUser = {
        username: newUsernameInput,
        phone: newPhoneInput,
        address: newAddressInput,
        email: newEmailInput,
        image: newImage
    };

    users.push(newUser);

    closeModal();
    populateContacts();
}

// Function to delete a contact
function deleteContact(index) {
    users.splice(index, 1);
    populateContacts();
}

// Function to search contacts
function searchContacts() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchValue) ||
        user.phone.includes(searchValue)
    );

    list.innerHTML = ''; // Clear existing list

    filteredUsers.forEach((user, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.className = "contact";
        contactDiv.innerHTML = `
            <img src="${user.image}" alt="Logo ${index + 1}" width="50">
            <div class="contact-details">
                <h3>${user.username}</h3>
                <p>Phone: ${user.phone}</p>
                <img class="info-img" src="img/information.png" alt="Information" width="35" onclick="openEditModal(${index})">
                <img src="img/delete.png" alt="Delete" width="35" onclick="deleteContact(${index})">
            </div>`;
        list.appendChild(contactDiv);
    });
}

// Initial population of contacts
populateContacts();

// Event listeners for close buttons
closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Event listener for adding new contact button
addNewContactBtn.addEventListener('click', openAddModal);

// Function to get next available image
function getNextAvailableImage() {
    const existingImages = users.map(user => user.image);
    const availableImages = ["img/img1.png", "img/img2.png", "img/img3.png"];

    for (let img of availableImages) {
        if (!existingImages.includes(img)) {
            return img;
        }
    }

    return availableImages[0]; // Default to first image if all are used
}
function changeBackgroundColor() {
    console.log("Change background color function called.");
    const currentColor = document.body.style.backgroundColor;
    const newColor = currentColor === "white" ? "lightblue" : "white";
    document.body.style.backgroundColor = newColor;
}


