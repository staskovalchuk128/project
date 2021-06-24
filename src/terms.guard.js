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
exports.TermsGuard = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var message_service_1 = require("./messages/message.service");
var TermsGuard = /** @class */ (function () {
    function TermsGuard(messages, router) {
        this.messages = messages;
        this.router = router;
    }
    TermsGuard.prototype.canActivate = function (route, state) {
        return true;
    };
    TermsGuard.prototype.canActivateChild = function (route, state) {
        return true;
    };
    TermsGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [message_service_1.MessageService,
            router_1.Router])
    ], TermsGuard);
    return TermsGuard;
}());
exports.TermsGuard = TermsGuard;
