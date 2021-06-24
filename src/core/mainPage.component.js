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
exports.MainPageComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var MainPageComponent = /** @class */ (function () {
    function MainPageComponent(activeRoute) {
        var _this = this;
        this.pik = 'Shitty';
        activeRoute.params.subscribe(function (params) {
            _this.pik = 'Shitty';
            console.log(params);
        });
    }
    MainPageComponent = __decorate([
        core_1.Component({
            selector: "app",
            moduleId: module.id,
            templateUrl: 'MainPage.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], MainPageComponent);
    return MainPageComponent;
}());
exports.MainPageComponent = MainPageComponent;
