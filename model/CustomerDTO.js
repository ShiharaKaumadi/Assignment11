function CustomerDTO(id, name, email, phone, address, salary) {
    var __id = id;
    var __name = name;
    var __email = email;
    var __phone = phone;
    var __address = address;
    var __salary = salary;

    this.getId = function () {
        return __id;
    }

    this.setId = function (id) {
        __id = id;
    }

    this.getName = function () {
        return __name;
    }

    this.setName = function (name) {
        __name = name;
    }

    this.getEmail = function () {
        return __email;
    }

    this.setEmail = function (email) {
        __email = email;
    }

    this.getPhone = function () {
        return __phone;
    }

    this.setPhone = function (phone) {
        __phone = phone;
    }

    this.getAddress = function () {
        return __address;
    }

    this.setAddress = function (address) {
        __address = address;
    }

    this.getSalary = function () {
        return __salary;
    }

    this.setSalary = function (salary) {
        __salary = salary;
    }
}