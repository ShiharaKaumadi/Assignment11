function CartTM(code, desc, price, qty, tot) {
    var __code = code;
    var __desc = desc;
    var __price = price;
    var __qty = qty;
    var __tot = tot;

    this.getICode = function () {
        return __code;
    }

    this.setICode = function (code) {
        __code = code;
    }

    this.getIName = function () {
        return __desc;
    }

    this.setIName = function (desc) {
        __desc = desc;
    }

    this.getIPrice = function () {
        return __price;
    }

    this.setIPrice = function (price) {
        __price = price;
    }

    this.getBuyQty = function () {
        return __qty;
    }

    this.setBuyQty = function (qty) {
        __qty = qty;
    }

    this.getITotal = function () {
        return __tot;
    }

    this.setITotal = function (tot) {
        __tot = tot;
    }
}