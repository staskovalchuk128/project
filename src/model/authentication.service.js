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
exports.AuthenticationService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ajax_requests_1 = require("../model/ajax.requests");
var user_service_1 = require("../model/user.service");
var operators_1 = require("rxjs/operators");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, ajax, userService) {
        this.http = http;
        this.ajax = ajax;
        this.userService = userService;
    }
    AuthenticationService.prototype.register = function (user) {
        var _this = this;
        return this.ajax.send({
            dir: 'auth',
            action: 'register',
            data: JSON.stringify(user)
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                if (response.data.hasOwnProperty('id') && response.data.id > 0) {
                    _this.userService.setUserId(response.data.id);
                    _this.userService.setUserData(response.data);
                }
                return true;
            }
            else {
                throw new Error(response.data);
            }
        }));
    };
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        return this.ajax.send({
            dir: 'auth',
            action: 'login',
            email: email,
            password: password
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                if (response.data.hasOwnProperty('id') && response.data.id > 0) {
                    _this.userService.setUserId(response.data.id);
                    _this.userService.setUserData(response.data);
                }
                return true;
            }
            else {
                throw new Error(response.data);
            }
        }));
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.ajax.send({
            dir: 'auth',
            action: 'logout'
        }).pipe(operators_1.map(function (response) {
            _this.userService.clear();
            return true;
        }));
    };
    AuthenticationService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_1.HttpClient, ajax_requests_1.AjaxRequests, user_service_1.UserService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
