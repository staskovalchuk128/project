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
exports.EventsService = void 0;
var core_1 = require("@angular/core");
var event_model_1 = require("./event.model");
var character_service_1 = require("./character.service");
var ajax_requests_1 = require("../model/ajax.requests");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var EventsService = /** @class */ (function () {
    function EventsService(ajax, router) {
        this.ajax = ajax;
        this.router = router;
        this.loadedEvents = false;
        this.loadedUserEvents = false;
        this.events = [];
        this.userEvents = [];
    }
    EventsService.prototype.createEvents = function (data) {
        var _this = this;
        data.forEach(function (event) {
            var date = new Date(event.date);
            _this.events.push(new event_model_1.Event(event.id, event.name, date, date.getFullYear(), date.getMonth(), date.getDate(), (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) //hh
                + ':' +
                (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()), //mm
            []));
        });
    };
    EventsService.prototype.loadUserEvents = function (characters) {
        var _this = this;
        characters.map(function (char) {
            _this.getEvents().map(function (event) {
                var char_event = event.players.find(function (c) { return c.id == char.id; });
                if (char_event) {
                    // console.log(this.getUserEvents().find(e => (e.event == event && e.character == char)));
                    if (!_this.getUserEvents().find(function (e) { return (e.event == event && e.character == char); })) {
                        _this.setUserEvent(event, char);
                    }
                }
            });
        });
        this.userEvents.sort(function (a, b) {
            return a.event.date - b.event.date;
        });
    };
    EventsService.prototype.setUserEvent = function (event, character) {
        this.userEvents.push({
            event: event,
            character: character
        });
    };
    EventsService.prototype.load = function () {
        var _this = this;
        return this.loadEvents().pipe(operators_1.mergeMap(function (res) {
            _this.loadedEvents = true;
            return _this.getEventsPlayers(_this.getEvents());
        }));
    };
    EventsService.prototype.loadEvents = function () {
        var _this = this;
        return this.ajax.send({
            dir: 'events',
            action: 'get_events',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.loadedEvents = true;
                _this.createEvents(response.data);
            }
            else {
                alert(response.data);
            }
            // return observableOf(true);
        }));
    };
    EventsService.prototype.getEvents = function () {
        return this.events;
    };
    EventsService.prototype.getUserEvents = function () {
        return this.userEvents;
    };
    EventsService.prototype.getEventsPlayers = function (events) {
        var _this = this;
        var requests = [];
        events.map(function (event) {
            requests.push(_this.getEventPlayers(event));
        });
        return rxjs_1.forkJoin(requests);
    };
    EventsService.prototype.joinEvent = function (event, character) {
        var _this = this;
        return this.ajax.send({
            dir: 'events',
            event_id: event.id,
            character_id: character.id,
            action: 'join_event',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.setPlayer(event, character);
            }
            else {
                alert(response.data);
            }
        }));
    };
    EventsService.prototype.removeEventPlayer = function (event_id, character_id) {
        var userEvent = this.getUserEvents().find(function (x) { return x.event.id == event_id && x.character.id == character_id; });
        if (event) {
            var index_player = userEvent.event.players.findIndex(function (p) { return p.id == character_id; });
            userEvent.event.players.splice(index_player, 1);
            var index_x = this.getUserEvents().findIndex(function (p) { return p.event.id == event_id && p.character.id == character_id; });
            this.userEvents.splice(index_x, 1);
        }
    };
    EventsService.prototype.leaveEvent = function (event_id, character_id) {
        var _this = this;
        return this.ajax.send({
            dir: 'events',
            event_id: event_id,
            character_id: character_id,
            action: 'leave_event',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.removeEventPlayer(event_id, character_id);
            }
            else {
                alert(response.data);
            }
        }));
    };
    EventsService.prototype.setPlayer = function (event, player) {
        var player_exist = event.players.find(function (x) { return x.id == player.id; });
        if (!player_exist) {
            event.players.push(Object.assign(new character_service_1.Character(), player));
        }
        else {
            player_exist = Object.assign(new character_service_1.Character(), player);
        }
    };
    EventsService.prototype.getEventPlayers = function (event) {
        var _this = this;
        return this.ajax.send({
            dir: 'events',
            event_id: event.id,
            action: 'get_event_players',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                response.data.map(function (player) {
                    _this.setPlayer(event, player);
                });
            }
            else {
                alert(response.data);
            }
            return event;
        }));
    };
    EventsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ajax_requests_1.AjaxRequests, router_1.Router])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
