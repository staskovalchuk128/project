"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var model_module_1 = require("./model/model.module");
var user_service_1 = require("./model/user.service");
var pages_module_1 = require("./pages/pages.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var auth_guard_1 = require("./helpers/auth.guard");
var account_guard_1 = require("./helpers/account.guard");
var notFound_component_1 = require("./pages/main/notFound.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpClientModule, pages_module_1.PagesModule, model_module_1.ModelModule, app_routing_1.routing],
            exports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [auth_guard_1.AuthGuard, account_guard_1.AccountGuard, user_service_1.UserService],
            declarations: [app_component_1.AppComponent, notFound_component_1.NotFoundComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
