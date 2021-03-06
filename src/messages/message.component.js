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
exports.MessageComponent = void 0;
var core_1 = require("@angular/core");
var message_service_1 = require("./message.service");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var MessageComponent = /** @class */ (function () {
    function MessageComponent(messageService, router) {
        var _this = this;
        this.router = router;
        messageService.messages.subscribe(function (m) { return _this.lastMessage = m; });
        router.events.pipe(operators_1.filter(function (e) { return e instanceof router_1.NavigationEnd || e instanceof
            router_1.NavigationCancel; })).subscribe(function (e) { _this.lastMessage = null; });
    }
    MessageComponent = __decorate([
        core_1.Component({
            selector: "paMessages",
            moduleId: module.id,
            templateUrl: "message.component.html",
        }),
        __metadata("design:paramtypes", [message_service_1.MessageService, router_1.Router])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
