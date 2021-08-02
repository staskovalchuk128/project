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
exports.CharactersComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../../model/user.service");
var character_service_1 = require("../../model/character.service");
var CharactersComponent = /** @class */ (function () {
    function CharactersComponent(user, characterService) {
        this.user = user;
        this.characterService = characterService;
        this.editing = false;
        this.character = new character_service_1.Character();
    }
    CharactersComponent.prototype.get_classes = function () {
        return this.characterService.getCharacterClasses();
    };
    CharactersComponent.prototype.getCharacters = function () {
        return this.characterService.getUserCharacters();
    };
    CharactersComponent.prototype.editCharacter = function (id) {
        this.editing = true;
        this.character = this.characterService.getUserCharacters().find(function (x) { return x.id == id; });
    };
    CharactersComponent.prototype.deleteCharacter = function (id) {
        if (!confirm('Are you sure you want to delete this character?'))
            return false;
        this.characterService.deleteCharacter(id).subscribe(function (r) {
        });
    };
    CharactersComponent.prototype.addCharacter = function (form) {
        var _this = this;
        if (!this.character.name)
            return alert('Enter name');
        if (!this.character.class_id)
            return alert('Select a class');
        if (!this.character.level)
            return alert('Enter level');
        this.character.level = this.character.level <= 0 ? 1 : this.character.level;
        var class_info = this.get_classes().find(function (x) { return x.id == _this.character.class_id; });
        if (class_info) {
            this.character.class_icon = class_info.icon;
            this.character.class_name = class_info.name;
        }
        this.characterService.addUserCharacter(this.character).subscribe(function (r) {
            _this.character = new character_service_1.Character();
            _this.editing = false;
            setTimeout(function () {
                form.reset();
            }, 0);
        });
    };
    CharactersComponent = __decorate([
        core_1.Component({
            selector: "account",
            moduleId: module.id,
            templateUrl: "characters.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, character_service_1.CharacterService])
    ], CharactersComponent);
    return CharactersComponent;
}());
exports.CharactersComponent = CharactersComponent;
