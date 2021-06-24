"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var message_module_1 = require("../messages/message.module");
var model_module_1 = require("../model/model.module");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var mainPage_component_1 = require("./mainPage.component");
var header_component_1 = require("./header.component");
var account_component_1 = require("./account.component");
var userMenu_component_1 = require("./account/userMenu.component");
var profile_component_1 = require("./account/profile.component");
var logout_component_1 = require("./account/logout.component");
var profileEdit_component_1 = require("./account/profileEdit.component");
var userMain_component_1 = require("./account/userMain.component");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, model_module_1.ModelModule, router_1.RouterModule, message_module_1.MessageModule],
            declarations: [login_component_1.LoginComponent, register_component_1.RegisterComponent, mainPage_component_1.MainPageComponent, header_component_1.HeaderComponent, account_component_1.AccountComponent,
                userMenu_component_1.UserMenuCompoment, logout_component_1.LogoutComponent, profile_component_1.ProfileComponent, profileEdit_component_1.ProfileEditComponent, userMain_component_1.UserMainComponent],
            exports: [model_module_1.ModelModule, header_component_1.HeaderComponent],
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
