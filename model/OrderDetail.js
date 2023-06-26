function OrderDetailsDTO(oId, code, desc, price, qty, tot) {
    var __oId = oId;
    var __code = code;
    var __desc = desc;
    var __price = price;
    var __qty = qty;
    var __tot = tot;

    this.getOrderId = function () {
        return __oId;
    }

    this.setOrderId = function (oId) {
        __oId = oId;
    }

    this.getItemCode = function () {
        return __code;
    }

    this.setItemCode = function (code) {
        __code = code;
    }

    this.getItemDescription = function () {
        return __desc;
    }

    this.setItemDescription = function (desc) {
        __desc = desc;
    }

    this.getUnitPrice = function () {
        return __price;
    }

    this.setUnitPrice = function (price) {
        __price = price;
    }

    this.getBuyQty = function () {
        return __qty;
    }

    this.setBuyQty = function (qty) {
        __qty = qty;
    }

    this.getRowTotal = function () {
        return __tot;
    }

    this.setRowTotal = function (tot) {
        __tot = tot;
    }
}