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
exports.Character = exports.CharacterService = void 0;
var core_1 = require("@angular/core");
var ajax_requests_1 = require("../model/ajax.requests");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var rxjs_2 = require("rxjs");
var CharacterService = /** @class */ (function () {
    function CharacterService(ajax, router) {
        this.ajax = ajax;
        this.router = router;
        this.loaded = false;
        this.characterClasses = [];
        this.userCharacters = [];
    }
    CharacterService.prototype.load = function () {
        return rxjs_2.forkJoin([this.loadClasses(), this.loadUserCharacters()]);
    };
    CharacterService.prototype.loadClasses = function () {
        var _this = this;
        return this.ajax.send({
            dir: 'character',
            action: 'get_classes',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.characterClasses = response.data;
            }
            else {
                alert(response.data);
            }
            return rxjs_1.of(true);
        }));
    };
    CharacterService.prototype.getCharacterClasses = function () {
        return this.characterClasses;
    };
    CharacterService.prototype.getUserCharacters = function () {
        return this.userCharacters;
    };
    CharacterService.prototype.addUserCharacter = function (data) {
        var _this = this;
        return this.ajax.send({
            dir: 'user',
            action: 'add_character',
            id: data.id,
            name: data.name,
            class_id: data.class_id,
            level: data.level
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                data.id = response.data.character_id;
                _this.addCharacter(data);
            }
            else {
                alert(response.data);
            }
        }));
    };
    CharacterService.prototype.addCharacter = function (data) {
        var index = this.userCharacters.findIndex(function (p) { return p.id == data.id; });
        if (data instanceof Character) {
            if (index == -1)
                this.userCharacters.push(data);
            else
                this.userCharacters.splice(index, 1, data);
        }
        else {
            if (index == -1) {
                this.userCharacters.push(new Character(data.id, data.name, data.class_id, data.class_name, data.class_icon, data.level));
            }
            else {
                //the same
            }
        }
    };
    CharacterService.prototype.deleteCharacter = function (id) {
        var _this = this;
        var index = this.userCharacters.findIndex(function (p) { return p.id == id; });
        if (index > -1) {
            return this.ajax.send({
                dir: 'user',
                id: id,
                action: 'delete_character',
            }).pipe(operators_1.map(function (response) {
                if (response.success == true) {
                    _this.userCharacters.splice(index, 1);
                }
                else {
                    alert(response.data);
                }
                return rxjs_1.of(true);
            }));
        }
        alert('Character not found');
    };
    CharacterService.prototype.loadUserCharacters = function () {
        var _this = this;
        return this.ajax.send({
            dir: 'user',
            action: 'get_characters',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                response.data.map(function (char) {
                    _this.addCharacter(char);
                });
            }
            else {
                alert(response.data);
            }
            return rxjs_1.of(true);
        }));
    };
    CharacterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ajax_requests_1.AjaxRequests, router_1.Router])
    ], CharacterService);
    return CharacterService;
}());
exports.CharacterService = CharacterService;
var Character = /** @class */ (function () {
    function Character(id, name, class_id, class_name, class_icon, level) {
        this.id = id;
        this.name = name;
        this.class_id = class_id;
        this.class_name = class_name;
        this.class_icon = class_icon;
        this.level = level;
    }
    return Character;
}());
exports.Character = Character;
