"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routing = void 0;
var router_1 = require("@angular/router");
var login_component_1 = require("./core/login/login.component");
var register_component_1 = require("./core/register/register.component");
var mainPage_component_1 = require("./core/mainPage.component");
var account_component_1 = require("./core/account.component");
var profile_component_1 = require("./core/account/profile.component");
var profileEdit_component_1 = require("./core/account/profileEdit.component");
var userMain_component_1 = require("./core/account/userMain.component");
var model_resolver_1 = require("./model/model.resolver");
var auth_guard_1 = require("./helpers/auth.guard");
var routes = [
    { path: "", component: mainPage_component_1.MainPageComponent, resolve: { model: model_resolver_1.ModelResolver } },
    { path: "login", component: login_component_1.LoginComponent, resolve: { model: model_resolver_1.ModelResolver } },
    { path: "register", component: register_component_1.RegisterComponent, resolve: { model: model_resolver_1.ModelResolver } },
    {
        path: "account",
        component: account_component_1.AccountComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: "", component: userMain_component_1.UserMainComponent },
            {
                path: "profile", component: profile_component_1.ProfileComponent,
            },
            {
                path: "profile/edit", component: profileEdit_component_1.ProfileEditComponent,
            }
        ],
        resolve: { model: model_resolver_1.ModelResolver }
    },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(routes);