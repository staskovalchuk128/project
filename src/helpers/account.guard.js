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
exports.AccountGuard = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../model/user.service");
var operators_1 = require("rxjs/operators");
var AccountGuard = /** @class */ (function () {
    function AccountGuard(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    AccountGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        if (this.userService.loadedUserId === true) {
            if (this.userService.getUserId() == 0) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
        return this.userService.loadUserId().pipe(operators_1.map(function (r) {
            var userId = _this.userService.getUserId();
            if (userId > 0)
                return true;
            _this.router.navigate(['/login']);
            return false;
        }));
    };
    AccountGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            user_service_1.UserService])
    ], AccountGuard);
    return AccountGuard;
}());
exports.AccountGuard = AccountGuard;
