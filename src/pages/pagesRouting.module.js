"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var mainPage_component_1 = require("./mainPage.component");
var events_component_1 = require("./events.component");
var gallery_component_1 = require("./gallery.component");
var news_component_1 = require("./news.component");
var user_resolver_1 = require("../model/resolvers/user.resolver");
var events_resolver_1 = require("../model/resolvers/events.resolver");
var gallery_resolver_1 = require("../model/resolvers/gallery.resolver");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var logout_component_1 = require("./account/logout.component");
var auth_guard_1 = require("../helpers/auth.guard");
var pages_component_1 = require("./pages.component");
var routes = [
    {
        path: "",
        component: pages_component_1.PagesComponent,
        resolve: { model: user_resolver_1.UserResolver },
        children: [
            { path: "", component: mainPage_component_1.MainPageComponent },
            { path: "events", resolve: { model: events_resolver_1.EventsResolver }, component: events_component_1.EventsComponent },
            { path: "gallery", resolve: { model: gallery_resolver_1.GalleryResolver }, component: gallery_component_1.GalleryComponent },
            { path: "news", component: news_component_1.NewsComponent },
            { path: "login", component: login_component_1.LoginComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: "register", component: register_component_1.RegisterComponent, canActivate: [auth_guard_1.AuthGuard] },
            {
                path: "account",
                loadChildren: function () { return Promise.resolve().then(function () { return require('./account/account.module'); }).then(function (m) { return m.AccountModule; }); },
            },
        ]
    },
    { path: "logout", component: logout_component_1.LogoutComponent }
];
var PagesRoutingModule = /** @class */ (function () {
    function PagesRoutingModule() {
    }
    PagesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PagesRoutingModule);
    return PagesRoutingModule;
}());
exports.PagesRoutingModule = PagesRoutingModule;
