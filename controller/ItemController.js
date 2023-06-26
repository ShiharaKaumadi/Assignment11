// Global variables
let itemsArray= [];
// Call the initializePage function when the window loads
window.addEventListener('load', initializePage);

const itemTableData = document.getElementById('itemTableData');
const entryItemForm = document.getElementById('register-item-Form');
const editItemEntryForm = document.getElementById('edit-item-EntryForm');
const registerItemForm = document.getElementById('register-item-Form');
const editItemForm = document.getElementById('edit-item-Form');
const addItemBtn = document.getElementById('add-item-button');
const saveItemBtn = document.getElementById('save-item-Btn');
const cancelItemBtn = document.getElementById('cancel-item-Btn');
const editSaveItemBtn = document.getElementById('update-item-Btn');
const editCancelItemBtn = document.getElementById('cancel-edit-item-Btn');
const reloadItemBtn = document.getElementById('reload-item-Btn');
const searchItemBar = document.getElementById('search-item-Bar');
const searchItemBtn = document.getElementById('search-item-Btn');

// Hide the register form
function hideRegisterItemForm() {
    registerItemForm.style.display = 'none';
    resetItemFormFields();
}

// Show the edit form
function showEditItemForm() {
    editItemForm.style.display = 'block';
}

// Hide the edit form
function hideEditItemForm() {
    editItemForm.style.display = 'none';
    resetItemFormFields();
}

// Reset the form fields
function resetItemFormFields() {
    entryItemForm.reset();
    editItemEntryForm.reset();
}

// Function to show the Register Customer Form
function showRegisterItemForm() {
    const clonedItemForm = registerItemForm.cloneNode(true);
    clonedItemForm.style.display = 'block';
    clonedItemForm.addEventListener('submit', saveItem); // Add event listener

    const mainItemContainer = document.getElementById('main-container');
    mainItemContainer.appendChild(clonedItemForm);

    const code = clonedItemForm.querySelector('#itemCodeInput');
    const generatedItemId = generateItemId();
    code.value = generatedItemId;
}

function generateItemId() {
    const lastItemId = itemsArray.length > 0 ? itemsArray[itemsArray.length - 1].code : 'I000';
    console.log('eshani');
    if (typeof lastItemId === 'string') {
        const newItemIdNumber = parseInt(lastItemId.substring(1)) + 1;
        const newItemId = `I${newItemIdNumber.toString().padStart(3, '0')}`;
        console.log(lastItemId);
        console.log(newItemId);
        return newItemId;
    } else {
        console.log(lastItemId);
        return 'I001'; // Default ID
    }
}

// Function to save the customer from the Register Customer Form
function saveItem(event) {
    event.preventDefault(); // Prevent form submission and page reload

    const code = document.getElementById('itemCodeInput').value;
    const desc = document.getElementById('descriptionInput').value;
    const qtyOnHand = document.getElementById('qtyOnHandInput').value;
    const price = document.getElementById('unitPriceInput').value;

    if (code && desc && qtyOnHand && price) {
        // Validate inputs using regex patterns
        const descriptionInputPattern = /^[A-Za-z0-9. ]+$/;
        const qtyOnHandInputPattern = /^\d+(\.\d{1,2})?$/;
        const unitPriceInputPattern = /^\d+(\.\d{1,2})?$/;

        if (!desc.match(descriptionInputPattern)) {
            alert('Please enter a valid Item name.');
            return;
        }
        if (!qtyOnHand.match(qtyOnHandInputPattern)) {
            alert('Please enter a valid number.');
            return;
        }
        if (!price.match(unitPriceInputPattern)) {
            alert('Please enter a price.');
            return;
        }

        const itemData = {
            code,
            desc,
            qtyOnHand,
            price
        };

        itemsArray.push(itemData);
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray)); // Add this line to update the local storage
        updateItemTable();
        initializePage();
        hideRegisterItemForm();
    }
}

function handleItemIdInput(event) {
    if (event === 13) {
        event.preventDefault();

        const itemId = event.target.value;
        console.log(itemId);

        // Retrieve customersData from localStorage
        const itemsArray = JSON.parse(localStorage.getItem('itemsArray'));
        console.log(itemsArray);

    }
}
const code = document.getElementById('item-code');
let desc = document.getElementById('item-name');
let price = document.getElementById('unit-price');
let qtyOnHand = document.getElementById('qty-on-hand');

function fillItemFields(){
    let item = null;
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].code === code) {
            item = itemsArray[i];
            break;
        }

    }

    // If customer is found, populate the invoice text fields
    if (item) {
        return  document.getElementById('item-code').value = item.code,
            document.getElementById('item-name').value = item.desc,
            document.getElementById('qty-on-hand').value = item.qtyOnHand,
            document.getElementById('unit-price').value = item.price;
    }
}

// Function to hide the Register item Form
function hideRegisterItemForm() {
    const registerItemForm = document.getElementById('register-item-Form');
    registerItemForm.parentNode.removeChild(registerItemForm);

    const addBtn = document.getElementById('add-item-button');
    addBtn.style.display = 'block';
}


// Function to update the item table
function updateItemTable(dataItemArray = itemsArray) {
    const itemTableBody = document.querySelector('#itemTableData tbody');
    itemTableBody.innerHTML = '';

    for (const item of dataItemArray) {
        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
      <td>${item.code}</td>
      <td>${item.desc}</td>
      <td>${item.qtyOnHand}</td>
      <td>${item.price}</td>
     
      <td>
        <button onclick="editItem('${item.code}')">Edit</button>
        <button onclick="deleteItem('${item.code}')">Delete</button>
      </td>
    `;
        itemTableBody.appendChild(itemRow);
    }
}


// Function to edit a customer's details
function editItem(code) {
    const item = itemsArray.find((items) => items.code === code);
    if (item) {
        const form = document.createElement('form');
        form.id = 'entry-item-Form';
        form.className = 'edit-item-Form'; // Add the CSS class to the form element

        form.innerHTML = `
      <label for="editItemCodeInput">Item Code</label>
      <input type="text" id="editItemCodeInput" value="${item.code}" readonly>
      <label for="editDescriptionInput">Item Name</label>
      <input type="text" id="editDescriptionInput" value="${item.desc}">
      <label for="editQtyOnHandInput">Qty OnHand</label>
      <input type="number" id="editQtyOnHandInput" value="${item.qtyOnHand}">
      <label for="editUnitPriceInput">Unit Price</label>
      <input type="number" id="editUnitPriceInput" value="${item.price}">
     
      
      <button type="submit" onclick="saveEditedItem()">Save</button>
      <button type="button" onclick="hideEditItemForm()">Cancel</button>
    `;

        const mainContainer = document.getElementById('main-container');
        mainContainer.appendChild(form);
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));

        // Show the edit form
        form.style.display = 'block';
    }
}


// Function to save the edited customer details
function saveEditedItem() {
    const code = document.getElementById('editItemCodeInput').value;
    const desc = document.getElementById('editDescriptionInput').value;
    const qtyOnHand = document.getElementById('editQtyOnHandInput').value;
    const price = document.getElementById('editUnitPriceInput').value;


    // Find the original customer data
    const originalItem = itemsArray.find(items => items.code === code);

    if (code && originalItem) {
        // Validate inputs using regex patterns
        const descriptionPattern =/^[A-Za-z0-9. ]+$/;
        const qtyOnHandPattern =/^\d+(\.\d{1,2})?$/;
        const unitPricePattern = /^\d+(\.\d{1,2})?$/;

        // Validate the edited fields
        if (desc && !desc.match(descriptionPattern)) {
            alert('Please enter a valid name.');
            return;
        }

        if (qtyOnHand && !qtyOnHand.match(qtyOnHandPattern)) {
            alert('Please enter a valid  number.');
            return;
        }

        if (price && !price.match(unitPricePattern)) {
            alert('Please enter a valid price.');
            return;
        }


        // Update the customer data with the edited values
        if (desc) {
            originalItem.desc = desc;
        }
        if (qtyOnHand) {
            originalItem.qtyOnHand = qtyOnHand;
        }
        if (price) {
            originalItem.price = price;
        }

        updateItemTable();
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
        initializePage();
        hideEditItemForm();
    } else {
        alert('Please fill all fields.');
    }
}


// Function to hide the Edit Customer Form
function hideEditItemForm() {
    const form = document.getElementById('edit-item-Form');
    if (form) {
        form.parentNode.removeChild(form);
    }
}

// Function to delete a customer
function deleteItem(code) {
    if (confirm('Are you sure you want to delete this item?')) {
        itemsArray = itemsArray.filter(items => items.code !== code);
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
        updateItemTable();

    }
}

// Function to filter the customer table based on search input
function filterItemTable() {
    const searchItem = document.getElementById('search-item-Bar').value.toLowerCase();
    const filteredItems = itemsArray.filter(items => {
        return (
            items.code.toLowerCase().includes(searchItem) ||
            items.desc.toLowerCase().includes(searchItem) ||
            items.qtyOnHand.toString().includes(searchItem) || // Convert to string and check
            items.price.toString().includes(searchItem)

        );
    });

    if (filteredItems.length === 0) {
        alert("Item Not found");
    } else {
        updateItemTable(filteredItems);
    }
    // Clear the search bar
    document.getElementById('search-item-Bar').value = '';
}

// Function to reload the customer table from local storage
function reloadItemTable() {
    const storedData = JSON.parse(localStorage.getItem('itemsArray')) || [];
    itemsArray = [...storedData]; // Make a copy of the original data

    updateItemTable(itemsArray);
}

/*
window.onload = function () {
    itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
    updateItemTable();
    const addItemBtn = document.getElementById('add-item-button');
    addItemBtn.addEventListener('click', showRegisterItemForm);


};

// Save customers to local storage on page unload
window.onbeforeunload = function () {
    // Save the customers array to local storage before leaving the page
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
};
*/
// Function to retrieve customer data from local storage
function retrieveItemData() {
    const storedData = localStorage.getItem('itemsArray');
    if (storedData) {
        try {
            itemsArray = JSON.parse(storedData);
        } catch (error) {
            console.error('Error parsing customer data from local storage:', error);
        }
    }
}

// Function to initialize the page
function initializePage() {
    retrieveItemData();
    updateItemTable();
}






