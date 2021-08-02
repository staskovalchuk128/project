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
exports.EventsResolver = void 0;
var core_1 = require("@angular/core");
var events_service_1 = require("../events.service");
var message_service_1 = require("../../messages/message.service");
var message_model_1 = require("../../messages/message.model");
var EventsResolver = /** @class */ (function () {
    function EventsResolver(eventsService, messages) {
        this.eventsService = eventsService;
        this.messages = messages;
    }
    EventsResolver.prototype.resolve = function (route, state) {
        if (this.eventsService.loadedEvents === false) {
            this.messages.reportMessage(new message_model_1.Message("Loading data..."));
            return this.eventsService.load();
        }
    };
    EventsResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [events_service_1.EventsService, message_service_1.MessageService])
    ], EventsResolver);
    return EventsResolver;
}());
exports.EventsResolver = EventsResolver;
