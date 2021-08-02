"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkPipe = void 0;
var core_1 = require("@angular/core");
var ChunkPipe = /** @class */ (function () {
    function ChunkPipe() {
    }
    ChunkPipe.prototype.transform = function (calendarDaysArray, chunkSize) {
        var calendarDays = [];
        var weekDays = [];
        calendarDaysArray.map(function (day, index) {
            weekDays.push(day);
            // here we need to use ++ in front of the variable else index increase
            //will happen after the evaluation but we need it to happen BEFORE
            if (++index % chunkSize === 0) {
                calendarDays.push(weekDays);
                weekDays = [];
            }
        });
        return calendarDays;
    };
    ChunkPipe = __decorate([
        core_1.Pipe({
            name: 'chunk'
        })
    ], ChunkPipe);
    return ChunkPipe;
}());
exports.ChunkPipe = ChunkPipe;
