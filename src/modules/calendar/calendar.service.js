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
exports.CalendarService = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var DAY_MS = 60 * 60 * 24 * 1000;
var CalendarService = /** @class */ (function () {
    function CalendarService() {
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.date = new Date();
        this.selected = new core_1.EventEmitter();
        this.dates = this.getCalendarDays(this.date);
    }
    CalendarService.prototype.getMonthName = function (cDate) {
        var d = cDate ? cDate : this.date;
        return this.monthNames[d.getMonth()];
    };
    CalendarService.prototype.getAllDays = function () {
        var calStartTime = this.getCalendarStartDay(this.date).getTime();
        return this.range(0, 41)
            .map(function (num) { return new Date(calStartTime + DAY_MS * num); });
    };
    CalendarService.prototype.setMonth = function (inc) {
        var _a = [this.date.getFullYear(), this.date.getMonth()], year = _a[0], month = _a[1];
        this.date = new Date(year, month + inc, 1);
        this.dates = this.getCalendarDays(this.date);
    };
    CalendarService.prototype.isSameMonth = function (date) {
        return date.getMonth() === this.date.getMonth();
    };
    CalendarService.prototype.getCalendarDays = function (date) {
        if (date === void 0) { date = new Date; }
        var calendarStartTime = this.getCalendarStartDay(date).getTime();
        return this.range(0, 41)
            .map(function (num) { return new Date(calendarStartTime + DAY_MS * num); });
    };
    CalendarService.prototype.getCalendarStartDay = function (date) {
        if (date === void 0) { date = new Date; }
        var _a = [date.getFullYear(), date.getMonth()], year = _a[0], month = _a[1];
        var firstDayOfMonth = new Date(year, month, 1).getTime();
        return this.range(1, 7)
            .map(function (num) { return new Date(firstDayOfMonth - DAY_MS * num); })
            .find(function (dt) { return dt.getDay() === 0; });
    };
    CalendarService.prototype.range = function (start, end, length) {
        if (length === void 0) { length = end - start + 1; }
        return Array.from({ length: length }, function (_, i) { return start + i; });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CalendarService.prototype, "selected", void 0);
    CalendarService = __decorate([
        core_2.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
