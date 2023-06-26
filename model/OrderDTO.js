function OrderDTO(oId, oDate, cId, payTot) {
    var __oId = oId;
    var __oDate = oDate;
    var __cId = cId;
    var __payTot = payTot;

    this.getOrderId = function () {
        return __oId;
    }
    this.setOrderId = function (oId) {
        __oId = oId;
    }
    this.getOrderDate = function () {
        return __oDate;
    }
    this.setOrderDate = function (oDate) {
        __oDate = oDate;
    }
    this.getCustomerId = function () {
        return __cId;
    }
    this.setCustomerId = function (cId) {
        __cId = cId;
    }
    this.getTotal = function () {
        return __payTot;
    }
    this.setTotal = function (payTot) {
        __payTot = payTot;
    }
}