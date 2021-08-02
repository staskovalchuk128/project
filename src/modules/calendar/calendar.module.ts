import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr/index';
import { CalendarModule, DateAdapter } from 'angular-calendar/index';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns/index';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class MCalendarModule {}
