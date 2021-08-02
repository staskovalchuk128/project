import { Component} from "@angular/core";
import { UserService } from "../model/user.service";
import { EventsService } from "../model/events.service";
import { ModalService  } from "../modules/modal/modal.service";
import { CalendarService  } from "../modules/calendar/calendar.service";
import { map } from 'rxjs/operators';


@Component({
  moduleId: module.id,
  templateUrl: 'events.component.html'
})
export class EventsComponent {
  events = {};
  currentSelectedEventsDate: string;
  constructor(protected eventsService: EventsService, protected userService: UserService, private modalService: ModalService, private calendar: CalendarService){
    this.getEvents();
  }


  getEvents(){
    let days = this.getDays();
    days.map(date => {
      this.eventsService.getEvents().forEach(ev => {
        if(date.getFullYear() == ev.year && date.getMonth() == ev.month && date.getDate() == ev.day){
          let dateKey = this.getDateKey(date);
          if(!this.events[dateKey]) this.events[dateKey] = [];
          this.events[dateKey].push(ev);
        }
      });
    });

  }

  getDays(){
    return this.calendar.getAllDays()
  }

  getMonthDays() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

  changeMonth(direction){
    let incNewMonth = direction == 'f' ? 1 : - 1;
    this.calendar.setMonth(incNewMonth);
  }

  getDateKey(date: Date){
    return date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
  }

  openEventInfoModal(id: string, date: Date) {
    let dateKey = this.getDateKey(date);
    var selectedEvents = this.events[dateKey];

    if(!selectedEvents) return false;

    this.currentSelectedEventsDate = 'Events for ' + this.calendar.getMonthName(date) + ' ' + date.getDate() + ', ' + date.getFullYear();


    var html = '';

    this.eventsService.getEventsPlayers(selectedEvents).subscribe(result => {

      selectedEvents.map(event => {
        html += '<div class="event_desc_w">';
        html += '<h5 class="text-left">' + event.time + ' - ' + event.name + '</h5>';
        html += '<div class="d-flex flex-wrap">';


        if(event.players.length == 0){
          html += '<div class="et_d_player">';
          html += '<span class="__name"> - No players</span>';
          html += '</div>';
        } else{
          event.players.map(player => {
            html += '<div class="et_d_player">';
            html += '<img src="/images/icons/' + player.class_icon + '" class="player_icon" alt="' + player.class_name + '">';
            html += '<span class="__name">' + player.name + '</span>';
            html += '</div>';
          });
        }

        html += '</div>';
        html += '</div>';


      });


      document.getElementById('event_desc').innerHTML = html;

      this.modalService.open(id);

    });

  }

  closeEventInfoModal(id: string) {
    this.modalService.close(id);
  }

}
