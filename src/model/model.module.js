"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModule = void 0;
var core_1 = require("@angular/core");
var ajax_requests_1 = require("./ajax.requests");
var user_repository_1 = require("./user.repository");
var user_resolver_1 = require("./resolvers/user.resolver");
var events_resolver_1 = require("./resolvers/events.resolver");
var character_resolver_1 = require("./resolvers/character.resolver");
var gallery_resolver_1 = require("./resolvers/gallery.resolver");
var ModelModule = /** @class */ (function () {
    function ModelModule() {
    }
    ModelModule = __decorate([
        core_1.NgModule({
            providers: [ajax_requests_1.AjaxRequests, user_repository_1.UserRepository, user_resolver_1.UserResolver, events_resolver_1.EventsResolver,
                gallery_resolver_1.GalleryResolver, character_resolver_1.CharacterResolver]
        })
    ], ModelModule);
    return ModelModule;
}());
exports.ModelModule = ModelModule;
