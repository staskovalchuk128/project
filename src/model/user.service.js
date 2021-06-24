"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("./user.model");
var ajax_requests_1 = require("../model/ajax.requests");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(ajax, router) {
        this.ajax = ajax;
        this.router = router;
        this.userId = 0;
        this.loadedUserData = false;
        this.loadedUserId = false;
    }
    UserService.prototype.setUserId = function (id) {
        this.userId = id;
        this.loadedUserId = true;
    };
    UserService.prototype.getUserId = function () {
        return this.userId;
    };
    UserService.prototype.loadUserId = function () {
        var _this = this;
        return this.ajax.send({
            dir: 'user',
            action: 'get_user_session'
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.setUserId(response.data);
            }
            else {
                //user not signed in
                _this.router.navigate(['/login']);
            }
        }));
    };
    UserService.prototype.saveUserData = function (newUserData) {
        var _this = this;
        return this.ajax.send({
            dir: 'user',
            action: 'save_user_data',
            userData: JSON.stringify(newUserData)
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.userData = newUserData;
                return _this.userData;
            }
            else {
                alert(response.data);
            }
        }));
    };
    UserService.prototype.setUserData = function (data) {
        this.userData = new user_model_1.User(data.id, data.first_name, data.last_name, data.middle_name, data.maiden_name, data.email, data.birthday, data.phone, data.job, data.gender, data.create_date);
        this.loadedUserData = true;
    };
    UserService.prototype.loadUserData = function () {
        var _this = this;
        if (this.loadedUserId === true)
            return this.getUserDataFromServer();
        return this.loadUserId().pipe(operators_1.map(function (r) {
            return _this.getUserDataFromServer();
        }));
    };
    UserService.prototype.getUserDataFromServer = function () {
        var _this = this;
        var user_id = this.getUserId();
        if (user_id > 0) {
            return this.ajax.send({
                dir: 'user',
                action: 'get_user_data',
                id: user_id
            }).pipe(operators_1.map(function (response) {
                if (response.success == true) {
                    _this.setUserData(response.data);
                }
                else {
                    // Error User Not Found
                    alert(response.data);
                }
                return _this.userData;
            }));
        }
    };
    UserService.prototype.getUserData = function () {
        return this.userData;
    };
    UserService.prototype.clear = function () {
        this.userId = 0;
        this.loadedUserData = false;
        this.loadedUserId = false;
        this.userData = new user_model_1.User();
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ajax_requests_1.AjaxRequests, router_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
