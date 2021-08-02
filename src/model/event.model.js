"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(id, name, date, year, month, day, time, players) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.year = year;
        this.month = month;
        this.day = day;
        this.time = time;
        this.players = players;
    }
    return Event;
}());
exports.Event = Event;
