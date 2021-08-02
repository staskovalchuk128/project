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
var router_1 = require("@angular/router");
var user_service_1 = require("../../model/user.service");
var events_service_1 = require("../../model/events.service");
var modal_service_1 = require("../../modules/modal/modal.service");
var event_model_1 = require("../../model/event.model");
var character_service_1 = require("../../model/character.service");
var EventsComponent = /** @class */ (function () {
    function EventsComponent(user, eventsService, modalService, characterService, activeRoute) {
        var _this = this;
        this.user = user;
        this.eventsService = eventsService;
        this.modalService = modalService;
        this.characterService = characterService;
        this.activeRoute = activeRoute;
        this.currentEvent = new event_model_1.Event();
        this.character = new character_service_1.Character();
        this.modalEventId = 'event_info_modal';
        this.modalOpened = false;
        this.joinEventDisplay = 'none';
        this.activeRoute.params.subscribe(function (params) {
            var mode = _this.activeRoute.snapshot.params["mode"];
            if (mode == 'myEvents') {
                _this.currentView = 'myEvents';
                _this.eventsService.loadUserEvents(_this.getCharacters());
            }
            else
                _this.currentView = 'allEvents';
        });
    }
    EventsComponent.prototype.ngOnInit = function () {
    };
    EventsComponent.prototype.getCharacters = function () {
        return this.characterService.getUserCharacters();
    };
    EventsComponent.prototype.getEvents = function () {
        return this.eventsService.getEvents();
    };
    EventsComponent.prototype.getMyEvents = function () {
        return this.eventsService.getUserEvents();
    };
    EventsComponent.prototype.leaveEvent = function (event, character_id) {
        this.eventsService.leaveEvent(event, character_id).subscribe(function (res) {
        });
    };
    EventsComponent.prototype.joinEvent = function () {
        var _this = this;
        this.eventsService.joinEvent(this.currentEvent, this.character).subscribe(function (res) {
            _this.updateEventPlayers(_this.currentEvent);
            _this.joinEventDisplay = 'none';
        });
    };
    EventsComponent.prototype.pickChar = function (id) {
        var find_char = this.getCharacters().find(function (x) { return x.id == id; });
        return this.character = !find_char ? new character_service_1.Character() : this.getCharacters().find(function (x) { return x.id == id; });
    };
    EventsComponent.prototype.openJoinEvent = function (event) {
        this.joinEventDisplay = 'block';
        if (this.modalOpened == false)
            this.openEventInfoModal(this.modalEventId, event);
    };
    EventsComponent.prototype.seeEventInfo = function (event) {
        this.joinEventDisplay = 'none';
        this.openEventInfoModal(this.modalEventId, event);
    };
    EventsComponent.prototype.openEventInfoModal = function (id, event) {
        var _this = this;
        this.eventsService.getEventPlayers(event).subscribe(function (result) {
            _this.modalInfoTitle = event.time + ' - ' + event.name;
            _this.updateEventPlayers(event);
            _this.currentEvent = event;
            _this.modalService.open(id);
            _this.modalOpened = true;
        });
    };
    EventsComponent.prototype.updateEventPlayers = function (event) {
        var html = '';
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
        document.getElementById('event_players').innerHTML = html;
    };
    EventsComponent.prototype.closeEventInfoModal = function (id) {
        this.modalService.close(id);
        this.modalOpened = false;
    };
    EventsComponent = __decorate([
        core_1.Component({
            selector: "account",
            moduleId: module.id,
            templateUrl: "events.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, events_service_1.EventsService,
            modal_service_1.ModalService, character_service_1.CharacterService,
            router_1.ActivatedRoute])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
