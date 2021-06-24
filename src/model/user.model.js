"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, firstName, lastName, middleName, maidenName, email, birthday, phone, job, gender, registrationDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.maidenName = maidenName;
        this.email = email;
        this.birthday = birthday;
        this.phone = phone;
        this.job = job;
        this.gender = gender;
        this.registrationDate = registrationDate;
    }
    return User;
}());
exports.User = User;
