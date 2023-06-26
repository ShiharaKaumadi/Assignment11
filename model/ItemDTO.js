function ItemDTO(code, desc, price, qty) {
    var __code = code;
    var __desc = desc;
    var __price = price;
    var __qty = qty;

    this.getCode = function () {
        return __code;
    }

    this.setCode = function (code) {
        __code = code;
    }

    this.getDescription = function () {
        return __desc;
    }

    this.setDescription = function (desc) {
        __desc = desc;
    }

    this.getUnitPrice = function () {
        return __price;
    }

    this.setUnitPrice = function (price) {
        __price = price;
    }

    this.getQty = function () {
        return __qty;
    }

    this.setQty = function (qty) {
        __qty = qty;
    }
}