"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var userMain_component_1 = require("./userMain.component");
var characters_component_1 = require("./characters.component");
var events_component_1 = require("./events.component");
var profile_component_1 = require("./profile.component");
var profileEdit_component_1 = require("./profileEdit.component");
var privacySettings_component_1 = require("./privacySettings.component");
var events_resolver_1 = require("../../model/resolvers/events.resolver");
var character_resolver_1 = require("../../model/resolvers/character.resolver");
var account_guard_1 = require("../../helpers/account.guard");
var account_component_1 = require("./account.component");
var routes = [
    {
        path: '',
        component: account_component_1.AccountComponent,
        canActivate: [account_guard_1.AccountGuard],
        children: [
            { path: "" || "main", component: userMain_component_1.UserMainComponent },
            {
                path: "profile", component: profile_component_1.ProfileComponent,
            },
            {
                path: "characters", resolve: { model: character_resolver_1.CharacterResolver }, component: characters_component_1.CharactersComponent,
            },
            {
                path: "events",
                resolve: { model: character_resolver_1.CharacterResolver, EventsResolver: events_resolver_1.EventsResolver },
                component: events_component_1.EventsComponent,
            },
            {
                path: "events/:mode",
                resolve: { model: character_resolver_1.CharacterResolver, EventsResolver: events_resolver_1.EventsResolver },
                component: events_component_1.EventsComponent,
            },
            {
                path: "profile/edit", component: profileEdit_component_1.ProfileEditComponent,
            },
            {
                path: "privacy", component: privacySettings_component_1.PrivacySettingsComponent,
            },
        ]
    }
];
var AccountRoutingModule = /** @class */ (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());
exports.AccountRoutingModule = AccountRoutingModule;
