import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';



const DAY_MS = 60 * 60 * 24 * 1000;

@Injectable({ providedIn: 'root' })
export class CalendarService {

  dates: Array<Date>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date = new Date();
  @Output() selected = new EventEmitter();

  constructor() {
    this.dates = this.getCalendarDays(this.date);
  }

  getMonthName(cDate: Date | ''){
    let d = cDate ? cDate : this.date;
    return this.monthNames[d.getMonth()];
  }

  getAllDays() {
    const calStartTime =  this.getCalendarStartDay(this.date).getTime();
    return this.range(0, 41)
    .map(num => new Date(calStartTime + DAY_MS * num));
  }

  setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.date);
  }

  isSameMonth(date) {
    return date.getMonth() === this.date.getMonth();
  }

  private getCalendarDays(date = new Date) {
    const calendarStartTime =  this.getCalendarStartDay(date).getTime();

    return this.range(0, 41)
    .map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  private getCalendarStartDay(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
    .map(num => new Date(firstDayOfMonth - DAY_MS * num))
    .find(dt => dt.getDay() === 0)
  }

  private range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }

}
