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
exports.LogoutComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../model/authentication.service");
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.authenticationService.logout().subscribe(function (r) {
            _this.router.navigateByUrl("/");
        });
    }
    LogoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: ""
        }),
        __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthenticationService])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
