// SideBarController.js
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");



function openSideBar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if (sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

function showDashboard() {
    document.getElementById("main-container").innerHTML = document.getElementById("mainContainer1").innerHTML;
    renderCharts();
}




function showCustomer() {
    document.getElementById("main-container").innerHTML = document.getElementById("mainContainer2").innerHTML;
    reloadTable();


}

function showItem() {
    document.getElementById("main-container").innerHTML = document.getElementById("mainContainer3").innerHTML;
    reloadItemTable();
}

function showPlaceOrder() {
    document.getElementById("main-container").innerHTML = document.getElementById("mainContainer4").innerHTML;
}







