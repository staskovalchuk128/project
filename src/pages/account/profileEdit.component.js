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
exports.ProfileEditComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../../model/user.service");
var user_model_1 = require("../../model/user.model");
var router_1 = require("@angular/router");
var ProfileEditComponent = /** @class */ (function () {
    function ProfileEditComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.user = new user_model_1.User();
        Object.assign(this.user, userService.getUserData() || new user_model_1.User());
    }
    ProfileEditComponent.prototype.saveChanges = function (form) {
        var _this = this;
        if (form.valid) {
            this.userService.saveUserData(this.user).subscribe(function (r) {
                if (typeof r !== "undefined") {
                    _this.user = r;
                    _this.router.navigateByUrl("/account/profile");
                }
            });
        }
    };
    ProfileEditComponent = __decorate([
        core_1.Component({
            selector: "account",
            moduleId: module.id,
            templateUrl: "profileEdit.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
    ], ProfileEditComponent);
    return ProfileEditComponent;
}());
exports.ProfileEditComponent = ProfileEditComponent;
