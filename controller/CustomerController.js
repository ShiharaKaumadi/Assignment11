// Global variables
let customerDetails =[];

// Call the initializePage function when the window loads
window.addEventListener('load', initializeCustomerPage);


const dataTable = document.getElementById('dataTable');
const entryForm = document.getElementById('entryForm');
const editEntryForm = document.getElementById('editEntryForm');
const registerForm = document.getElementById('registerForm');
const editForm = document.getElementById('editForm');
const addBtn = document.getElementById('addBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const editSaveBtn = document.getElementById('editSaveBtn');
const editCancelBtn = document.getElementById('editCancelBtn');
const reloadBtn = document.getElementById('reloadBtn');
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');

// Hide the register form
function hideRegisterForm() {
    registerForm.style.display = 'none';
    resetFormFields();
}

// Show the edit form
function showEditForm() {
    editForm.style.display = 'block';
}

// Hide the edit form
function hideEditForm() {
    editForm.style.display = 'none';
    resetFormFields();
}

// Reset the form fields
function resetFormFields() {
    entryForm.reset();
    editEntryForm.reset();
}

// Function to show the Register Customer Form
function showRegisterForm() {
    const addBtn = document.getElementById('addBtn');
    addBtn.style.display = 'none';
    const clonedForm = registerForm.cloneNode(true);
    clonedForm.style.display = 'block';
    clonedForm.addEventListener('submit', saveCustomer); // Add event listener

    const mainContainer = document.getElementById('main-container');
    mainContainer.appendChild(clonedForm);

    const idField = clonedForm.querySelector('#idInput');
    const generatedId = generateCustomerId();
    idField.value = generatedId;
}

function generateCustomerId() {
    const lastId = customerDetails.length > 0 ? customerDetails[customerDetails.length - 1].id : 'C000';

    if (typeof lastId === 'string') {
        const newIdNumber = parseInt(lastId.substring(1)) + 1;
        const newId = `C${newIdNumber.toString().padStart(3, '0')}`;
        console.log(lastId);
        console.log(newId);
        return newId;
    } else {
       console.log(lastId);
        return 'C001'; // Default ID
    }
}


// Function to save the customer from the Register Customer Form
function saveCustomer(event) {
   event.preventDefault(); // Prevent form submission and page reload

    const id = document.getElementById('idInput').value;
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const email = document.getElementById('emailInput').value;
    const address = document.getElementById('addressInput').value;
    const salary = document.getElementById('salaryInput').value;

    if (id && name && phone && email && address && salary) {
        // Validate inputs using regex patterns
        const namePattern = /^[A-Za-z\s'-]+$/;
        const phonePattern = /^07[01245678]\d{7}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const addressPattern = /^.+$/;
        const salaryPattern = /^\d+(\.\d{1,2})?$/;

        if (!name.match(namePattern)) {
            alert('Please enter a valid Name.');
            return;
        }
        if (!phone.match(phonePattern)) {
            alert('Please enter a valid phone number.');
            return;
        }

        if (!email.match(emailPattern)) {
            alert('Please enter a valid email.');
            return;
        }
        if (!address.match(addressPattern)) {
            alert('Please enter a valid address.');
            return;
        }
        if (!salary.match(salaryPattern)) {
            alert('Please enter a valid salary.');
            return;
        }

        const customerValues = {
            id,
            name,
            phone,
            email,
            address,
            salary
        };

        customerDetails.push(customerValues);
        localStorage.setItem('customerDetails', JSON.stringify(customerDetails)); // Update local storage
        updateCustomerTable(); // Update the customer table

        hideRegisterForm();

        }
}
function handleCustomerIdInput(event) {
    if (event === 13) {
        event.preventDefault();

        const customerId = event.target.value;
        console.log(customerId);

        // Retrieve customersData from localStorage
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'));
        console.log(customerDetails);

    }
}
const customerId = document.getElementById('customerId');
let customerName = document.getElementById('customerName');
let customerAddress = document.getElementById('customerAddress');
const customerSalary = document.getElementById('customerSalary');

function fillFields(){
    let customer = null;
    for (let i = 0; i < customerDetails.length; i++) {
        if (customerDetails[i].id === customerDetails) {
            customer = customerDetails[i];
            break;
        }

    }

    // If customer is found, populate the invoice text fields
    if (customer) {
        return  document.getElementById('customerName').value = customer.name,
            document.getElementById('customerAddress').value = customer.address,
            document.getElementById('customerSalary').value = customer.salary;
    }
}

// Function to hide the Register Customer Form
    function hideRegisterForm() {
        const registerForm = document.getElementById('registerForm');
        registerForm.parentNode.removeChild(registerForm);

        const addBtn = document.getElementById('addBtn');
        addBtn.style.display = 'block';
    }


// Function to update the customer table
    function updateCustomerTable(array = customerDetails) {
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';

        for (const customer of array) {
            const row = document.createElement('tr');
            row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.address}</td>
      <td>${customer.salary}</td>
      <td>
        <button onclick="editCustomer('${customer.id}')">Edit</button>
        <button onclick="deleteCustomer('${customer.id}')">Delete</button>
      </td>
    `;
            tableBody.appendChild(row);
        }
    }


// Function to edit a customer's details
    function editCustomer(id) {
        const customer = customerDetails.find((cust) => cust.id === id);
        if (customer) {
            const form = document.createElement('form');
            form.id = 'editForm';
            form.className = 'edit-form'; // Add the CSS class to the form element

            form.innerHTML = `
      <label for="editIdInput">ID:</label>
      <input type="text" id="editIdInput" value="${customer.id}" readonly>
      <label for="editNameInput">Name:</label>
      <input type="text" id="editNameInput" value="${customer.name}">
      <label for="editPhoneInput">Phone:</label>
      <input type="tel" id="editPhoneInput" value="${customer.phone}">
      <label for="editEmailInput">Email:</label>
      <input type="email" id="editEmailInput" value="${customer.email}">
      <label for="editAddressInput">Address:</label>
      <input type="text" id="editAddressInput" value="${customer.address}">
      <label for="editSalaryInput">Salary:</label>
      <input type="number" id="editSalaryInput" value="${customer.salary}">
      <button type="button" onclick="saveEditedCustomer()">Save</button>
      <button type="button" onclick="hideEditForm()">Cancel</button>
    `;

            const mainContainer = document.getElementById('main-container');
            mainContainer.appendChild(form);
            localStorage.setItem('customerDetails', JSON.stringify(customerDetails));

            // Show the edit form
            form.style.display = 'block';
        }
    }


// Function to save the edited customer details
    function saveEditedCustomer() {
        const id = document.getElementById('editIdInput').value;
        const name = document.getElementById('editNameInput').value;
        const phone = document.getElementById('editPhoneInput').value;
        const email = document.getElementById('editEmailInput').value;
        const address = document.getElementById('editAddressInput').value;
        const salary = document.getElementById('editSalaryInput').value;

        // Find the original customer data
        const originalCustomer = customerDetails.find(cust => cust.id === id);

        if (id && originalCustomer) {
            // Validate inputs using regex patterns
            const namePattern = /^[A-Za-z\s'-]+$/;
            const phonePattern = /^07[01245678]\d{7}$/;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const addressPattern = /^.+$/;
            const salaryPattern = /^\d+(\.\d{1,2})?$/;

            // Validate the edited fields
            if (name && !name.match(namePattern)) {
                alert('Please enter a valid name.');
                return;
            }

            if (phone && !phone.match(phonePattern)) {
                alert('Please enter a valid phone number.');
                return;
            }

            if (email && !email.match(emailPattern)) {
                alert('Please enter a valid email.');
                return;
            }

            if (address && !address.match(addressPattern)) {
                alert('Please enter a valid address.');
                return;
            }

            if (salary && !salary.match(salaryPattern)) {
                alert('Please enter a valid salary.');
                return;
            }

            // Update the customer data with the edited values
            if (name) {
                originalCustomer.name = name;
            }
            if (phone) {
                originalCustomer.phone = phone;
            }
            if (email) {
                originalCustomer.email = email;
            }
            if (address) {
                originalCustomer.address = address;
            }
            if (salary) {
                originalCustomer.salary = salary;
            }

            updateCustomerTable();
            localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
            hideEditForm();
        } else {
            alert('Please fill all fields.');
        }
    }


// Function to hide the Edit Customer Form
    function hideEditForm() {
        const form = document.getElementById('editForm');
        if (form) {
            form.parentNode.removeChild(form);
        }
    }

// Function to delete a customer
    function deleteCustomer(id) {
        if (confirm('Are you sure you want to delete this customer?')) {
            customerDetails = customerDetails.filter(cust => cust.id !== id);
            localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
            updateCustomerTable();

        }
    }

// Function to filter the customer table based on search input
    function filterTable() {
        const searchInput = document.getElementById('searchBar').value.toLowerCase();
        const filteredCustomers = customerDetails.filter(cust => {
            return (
                cust.id.toLowerCase().includes(searchInput) ||
                cust.name.toLowerCase().includes(searchInput) ||
                cust.email.toLowerCase().includes(searchInput) ||
                cust.phone.toLowerCase().includes(searchInput) ||
                cust.address.toLowerCase().includes(searchInput) ||
                cust.salary.toLowerCase().includes(searchInput)
            );
        });

        if (filteredCustomers.length === 0) {
            alert("Customer Not found");
        } else {
            updateCustomerTable(filteredCustomers);
        }
        // Clear the search bar
        document.getElementById('searchBar').value = '';
    }

// Function to reload the customer table from local storage
    function reloadTable() {
        const storedData = JSON.parse(localStorage.getItem('customerDetails')) || [];
        console.log('RRRRRRRRRRRRRRRRRRR')
        console.log(storedData);
        customerDetails = [...storedData]; // Make a copy of the original data
        updateCustomerTable(customerDetails);

    }

/*    window.onload = function () {
        customerDetails = JSON.parse(localStorage.getItem('customerDetails')) || [];
        console.log('PPPPPPPPPPPPPPPPPPPPPPPP')
        console.log(customerDetails);
        updateCustomerTable();
        const addCusBtn = document.getElementById('addBtn');
        addCusBtn.addEventListener('click', showRegisterForm);


    };

// Save customers to local storage on page unload
    window.onbeforeunload = function () {
        // Save the customers array to local storage before leaving the page
        localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
    };*/

// Function to retrieve customer data from local storage
function retrieveCustomerData() {
    const storedData = localStorage.getItem('customerDetails');
    if (storedData) {
        try {
            customerDetails = JSON.parse(storedData);
        } catch (error) {
            console.error('Error parsing customer data from local storage:', error);
        }
    }
}

// Function to initialize the page
function initializeCustomerPage() {
    retrieveCustomerData();
    updateCustomerTable();
}








