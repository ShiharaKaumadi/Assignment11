var mainContainer = document.getElementById('main-container');
var currentContentId = null; // Store the current content ID as a string

function showDashboard() {
    loadContent('mainContainer1');
}

function showCustomer() {
    loadContent('mainContainer2');
}

function showItem() {
    loadContent('mainContainer3');
}

function showPlaceOrder() {
    loadContent('mainContainer4');
}

function loadContent(contentId) {
    // Check if the requested content is already loaded
    if (currentContentId === contentId) {
        return;
    }

    var contentContainer = document.getElementById(contentId);

    // Check if contentContainer exists
    if (!contentContainer) {
        console.error("Content container element not found.");
        return;
    }

    // Hide the previously displayed content if any
    if (currentContentId !== null) {
        var previousContentContainer = document.getElementById(currentContentId);
        if (previousContentContainer) {
            previousContentContainer.style.display = 'none';
        }
    }

    // Display the content container
    contentContainer.style.display = 'block';

    // Update the current content ID
    currentContentId = contentId;

    // Move the content container to the main container
    mainContainer.innerHTML = '';
    mainContainer.appendChild(contentContainer);
}

document.addEventListener('DOMContentLoaded', function() {
    // Assuming you have references to the relevant links with IDs:
    var dashboardLink = document.getElementById('dashboard');
    var customerLink = document.getElementById('customer');
    var itemLink = document.getElementById('item');
    var placeOrderLink = document.getElementById('placeOrder');

    // Add event listeners to the links
    dashboardLink.addEventListener('click', function() {
        showDashboard();
    });
    customerLink.addEventListener('click', function() {
        showCustomer();
    });
    itemLink.addEventListener('click', function() {
        showItem();
    });
    placeOrderLink.addEventListener('click', function() {
        showPlaceOrder();
    });

    // Initial load (assuming you want to load 'mainContainer1' by default)
    showDashboard();
});