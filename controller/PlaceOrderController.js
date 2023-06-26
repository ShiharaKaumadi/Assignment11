document.addEventListener('DOMContentLoaded', function () {

    formDetails();
    getPreviousOrderId();
    orderDateDetails();
    // Event listener for input changes in idInput field
    var idInput = document.getElementById('customerId');
    idInput.addEventListener('input', fillFieldsById);
});

//To access the event listener function defined within addEventListener outside of its scope,
function formDetails() {
    console.log('ahenwada gahena hadawatha mage');

    const orderIdField = document.getElementById('orderId');
    orderIdField.removeAttribute('readOnly');

    const lastOrderId = getPreviousOrderId(); // Function to get the last order ID
    console.log('lastOrderId ay bn uba ennaththe');

    orderIdField.setAttribute('value', lastOrderId);
    orderIdField.value = lastOrderId;
    console.log('orderId=' + lastOrderId);


}
// Function to get the last order ID
function getPreviousOrderId() {
    console.log('Ane call weyan mala wade')
    const lastOrderId = invoiceDetails.length > 0 ? invoiceDetails[invoiceDetails.length - 1].id : 'O000';
    if (typeof lastOrderId === 'string') {
        console.log('Mn if eka athule')
        const newIdNumber = parseInt(lastOrderId.substring(1)) + 1;
        const newId = `O${newIdNumber.toString().padStart(3, '0')}`;
        console.log(lastOrderId);
        console.log(newId);
        return newId;
    } else {
        console.log('Mn track out')
        console.log(lastOrderId);
        return 'O001'; // Default ID
    }
}
function orderDateDetails(){
    const orderDateField = document.getElementById('orderDate');

    const currentDate = getCurrentDate();
    orderDateField.setAttribute('value', currentDate);
    orderDateField.value = currentDate;
    console.log(currentDate);

    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    }


}

var customers = localStorage.getItem("customerDetails");
var customersArray = JSON.parse(customers);
console.log(customersArray);

function fillFieldsById() {
    var idInput = document.getElementById('customerId');
    var nameInput = document.getElementById('customerName');
    var addressInput = document.getElementById('customerAddress');
    var salaryInput = document.getElementById('customerSalary');

    var id = idInput.value;
    console.log(id);
    var extractedData = extractValById(id);
    console.log('*************************')
    console.log(extractedData);
    console.log('*************************')
    nameInput.value = extractedData.name || '';
    console.log(nameInput.value);
    addressInput.value = extractedData.address || '';
    salaryInput.value = extractedData.salary || '';
}

function extractValById(id) {
    var extractedValues = {};
    console.log("method eke");
    for (var i = 0; i < customerDetails.length; i++) {
        var customer = customerDetails[i];
        console.log("for loop eke");
        if (customer.id === id) {
            console.log("if eke");
            extractedValues.name = customer.name;
            extractedValues.address = customer.address;
            extractedValues.salary = customer.salary;
            break;
        }
        console.log("if eken eliye")
    }
    console.log("for loop eken eliye");
    return extractedValues;
}

/* Item Form*/

var itemArr = localStorage.getItem("itemsArray");
var arr = JSON.parse(itemArr);
console.log(arr);

function fillItemFieldsById() {
    var code = document.getElementById('item-code');
    var desc = document.getElementById('item-name');
    var qtyOnHand = document.getElementById('qty-on-hand');
    var price = document.getElementById('unit-price');

    var cd = code.value;
    console.log(cd);
    var extractedItemData = extractItemValById(cd);
    console.log('*************************')
    console.log(extractedItemData);
    console.log('*************************')
    desc.value = extractedItemData.desc || '';
    console.log(desc.value);
    qtyOnHand.value = extractedItemData.qtyOnHand || '';
    price.value = extractedItemData.price || '';
}

function extractItemValById(code) {
    var extractedItemValues = {};
    console.log("item ganna method eke");
    for (var i = 0; i < itemsArray.length; i++) {
        var items = itemsArray[i];
        console.log("for loop eke");
        if (items.code === code) {
            console.log("if eke");
            extractedItemValues.desc = items.desc;
            extractedItemValues.qtyOnHand = items.qtyOnHand;
            extractedItemValues.price = items.price;
            break;
        }
        console.log("if eken eliye")
    }
    console.log("for loop eken eliye");
    return extractedItemValues;
}

// Function to update the itemTableData in localStorage
function updateItemTableData(itemsArray) {
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
}

let records = [];

// Function to handle the form Add to cart
function handleFormSubmit(event) {
    event.preventDefault();

    let code = document.getElementById('item-code').value;
    let desc = document.getElementById('item-name').value;
    let price = parseFloat(document.getElementById('unit-price').value);
    let qty = parseInt(document.getElementById('qty').value);
    let tot = parseFloat(document.getElementById('payment-total').value);

    // Find the item in itemTableData
    var itemIndex = -1;
    for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].code === code) {
            itemIndex = i;
            break;
        }
    }

    if (itemIndex !== -1) {
        // Check if there is enough quantity available
        if (itemsArray[itemIndex].qtyOnHand >= qty) {
            // Reduce the quantity on hand
            itemsArray[itemIndex].qtyOnHand -= qty;
            // Update the itemTableData in localStorage
            updateItemTableData(itemsArray);

            tot = qty * price;

            // Add the item data to the orderTableData
            var order = {
                code: code, desc: desc, price: price, qty: qty, tot: tot
            };
            console.log('Ay ane oya cart ekata yannaththe');
            console.log(order);
            var existingItem = records.find((item) => item.code === code);
            if (existingItem) {
                // Update the quantity and total for existing item
                existingItem.qty += qty;
                existingItem.tot += qty * price;
                updateTotal(); // Update the table and total
            } else {
                // Add a new item to records
                tot = qty * price;
                var order = {
                    code: code, desc: desc, price: price, qty: qty, tot: tot
                };
                records.push(order);
                localStorage.setItem('records', JSON.stringify(records));
                updateTotal(); // Update the table and total
            }

            // Display a success message
            alert('Item added to cart!');
            // Reset the form fields
            document.getElementById('item-code').value = '';
            document.getElementById('item-name').value = '';
            document.getElementById('qty').value = '';
            document.getElementById('unit-price').value = '';
            document.getElementById('qty-on-hand').value = '';
        } else {
            alert('Not enough quantity available.');
        }
    } else {
        alert('Item not found.');
    }
}

// Attach the form submit event listener
document.getElementById('items').addEventListener('click', handleFormSubmit);

function updateTotal() {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear the table body before adding records

    var tot = 0;
    for (var i = 0; i < records.length; i++) {
        tot = tot + records[i].tot;
        var row = document.createElement('tr');
        var codeCell = document.createElement('td');
        codeCell.textContent = records[i].code;
        var descCell = document.createElement('td');
        descCell.textContent = records[i].desc;
        var priceCell = document.createElement('td');
        priceCell.textContent = records[i].price;
        var qtyCell = document.createElement('td');
        qtyCell.textContent = records[i].qty;
        var totCell = document.createElement('td');
        totCell.textContent = records[i].tot;

        row.appendChild(codeCell);
        row.appendChild(descCell);
        row.appendChild(priceCell);
        row.appendChild(qtyCell);
        row.appendChild(totCell);

        tableBody.appendChild(row);
    }

    document.getElementById('payment-total').value = tot;
    document.getElementById('no-items').value = itemCount();

}

function itemCount() {
    var noItems = records.length;
    console.log(noItems);
    return noItems;
}

function calculateBalance(event) {
    event.preventDefault(); // Prevent form submission

    var paymentTotal = parseFloat(document.getElementById("payment-total").value);
    var noOfItems = parseFloat(document.getElementById("no-items").value);
    var cash = parseFloat(document.getElementById("cash").value);
    var balance = cash - paymentTotal;

    if (!isNaN(balance)) {
        document.getElementById("balance").value = balance.toFixed(2);
    } else {
        document.getElementById("balance").value = "";
    }
}

let placeOrderData = [];

function placeOrder(event){
    event.preventDefault(); // Prevent form submission and page reload
    console.log('place order ekata awaa....')

    const oId = document.getElementById('orderId').value;
    const oDate = document.getElementById('orderDate').value;
    const cId = document.getElementById('customerId').value;
    const payTot = document.getElementById('payment-total').value;
    const placeOrderValues = {
        oId:oId,
        oDate:oDate,
        cId:cId,
        payTot:payTot,

    };

    placeOrderData.push(placeOrderValues);
    localStorage.setItem('placeOrderData', JSON.stringify(placeOrderData)); // Update local storage
    alert('Order Placed Successfully');
    document.getElementById('payment-total').value='';
    document.getElementById('cash').value='';
    document.getElementById('no-items').value='';
    document.getElementById('balance').value='';

    // Retrieve the current records array from local storage
    var records = JSON.parse(localStorage.getItem('records')) || [];

// Get a reference to the table element
    var table = document.getElementById('orderTableData');

// Clear the table contents
    table.innerHTML = '';

// Iterate over the records array and append each record to the table
    records.forEach(function(record) {
        var row = table.insertRow();

        var codeCell = row.insertCell();
        var descCell = row.insertCell();
        var priceCell = row.insertCell();
        var qtyCell = row.insertCell();
        var totalCell = row.insertCell();

        codeCell.textContent = record.code;
        descCell.textContent = record.desc;
        priceCell.textContent = record.price;
        qtyCell.textContent = record.qty;
        totalCell.textContent = record.tot;
    });

// Save the updated records array back to local storage
    localStorage.setItem('records', JSON.stringify(records));

}













