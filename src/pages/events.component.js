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
exports.EventsComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../model/user.service");
var events_service_1 = require("../model/events.service");
var modal_service_1 = require("../modules/modal/modal.service");
var calendar_service_1 = require("../modules/calendar/calendar.service");
var EventsComponent = /** @class */ (function () {
    function EventsComponent(eventsService, userService, modalService, calendar) {
        this.eventsService = eventsService;
        this.userService = userService;
        this.modalService = modalService;
        this.calendar = calendar;
        this.events = {};
        this.getEvents();
    }
    EventsComponent.prototype.getEvents = function () {
        var _this = this;
        var days = this.getDays();
        days.map(function (date) {
            _this.eventsService.getEvents().forEach(function (ev) {
                if (date.getFullYear() == ev.year && date.getMonth() == ev.month && date.getDate() == ev.day) {
                    var dateKey = _this.getDateKey(date);
                    if (!_this.events[dateKey])
                        _this.events[dateKey] = [];
                    _this.events[dateKey].push(ev);
                }
            });
        });
    };
    EventsComponent.prototype.getDays = function () {
        return this.calendar.getAllDays();
    };
    EventsComponent.prototype.getMonthDays = function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    };
    EventsComponent.prototype.changeMonth = function (direction) {
        var incNewMonth = direction == 'f' ? 1 : -1;
        this.calendar.setMonth(incNewMonth);
    };
    EventsComponent.prototype.getDateKey = function (date) {
        return date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    };
    EventsComponent.prototype.openEventInfoModal = function (id, date) {
        var _this = this;
        var dateKey = this.getDateKey(date);
        var selectedEvents = this.events[dateKey];
        if (!selectedEvents)
            return false;
        this.currentSelectedEventsDate = 'Events for ' + this.calendar.getMonthName(date) + ' ' + date.getDate() + ', ' + date.getFullYear();
        var html = '';
        this.eventsService.getEventsPlayers(selectedEvents).subscribe(function (result) {
            selectedEvents.map(function (event) {
                html += '<div class="event_desc_w">';
                html += '<h5 class="text-left">' + event.time + ' - ' + event.name + '</h5>';
                html += '<div class="d-flex flex-wrap">';
                if (event.players.length == 0) {
                    html += '<div class="et_d_player">';
                    html += '<span class="__name"> - No players</span>';
                    html += '</div>';
                }
                else {
                    event.players.map(function (player) {
                        html += '<div class="et_d_player">';
                        html += '<img src="/images/icons/' + player.class_icon + '" class="player_icon" alt="' + player.class_name + '">';
                        html += '<span class="__name">' + player.name + '</span>';
                        html += '</div>';
                    });
                }
                html += '</div>';
                html += '</div>';
            });
            document.getElementById('event_desc').innerHTML = html;
            _this.modalService.open(id);
        });
    };
    EventsComponent.prototype.closeEventInfoModal = function (id) {
        this.modalService.close(id);
    };
    EventsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'events.component.html'
        }),
        __metadata("design:paramtypes", [events_service_1.EventsService, user_service_1.UserService, modal_service_1.ModalService, calendar_service_1.CalendarService])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
