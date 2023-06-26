document.addEventListener('DOMContentLoaded', function() {
    // Get the datepicker element
    var datepicker = document.getElementById('datepicker');

    // Initialize the datepicker
    new Datepicker(datepicker);
});

function Datepicker(element) {
    // Create a datepicker instance
    var datepicker = new Pikaday({
        field: element
    });
}

// Include the Pikaday library (pure JavaScript datepicker)
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.8.2/pikaday.min.js';
script.onload = function() {
    // After the Pikaday library is loaded, start the initialization
    document.dispatchEvent(new Event('DOMContentLoaded'));
};

// Append the script tag to the document's head
document.head.appendChild(script);