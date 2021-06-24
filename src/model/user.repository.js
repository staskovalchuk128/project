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
exports.UserRepository = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ajax_requests_1 = require("../model/ajax.requests");
var UserRepository = /** @class */ (function () {
    function UserRepository(ajax, router) {
        this.ajax = ajax;
        this.router = router;
    }
    UserRepository.prototype.getUserInfo = function () {
        var storageUser = localStorage.getItem('USER');
        if (storageUser) {
            this.userData = JSON.parse(storageUser);
        }
        else {
            this.ajax.send({
                dir: 'auth',
                action: 'login'
            }).subscribe(function (data) {
                console.log(data);
            });
        }
        return this.userData;
    };
    UserRepository = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ajax_requests_1.AjaxRequests, router_1.Router])
    ], UserRepository);
    return UserRepository;
}());
exports.UserRepository = UserRepository;
