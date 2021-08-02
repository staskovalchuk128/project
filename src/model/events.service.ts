import { Injectable } from '@angular/core';
import { Event } from "./event.model";
import { UserRepository } from "./user.repository";
import { Character } from "./character.service";
import { AjaxRequests } from "../model/ajax.requests";
import { of as observableOf,  Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  loadedEvents: boolean = false;
  loadedUserEvents: boolean = false;
  events = [];
  userEvents = [];

  constructor(private ajax: AjaxRequests, private router: Router) {
  }

   createEvents(data){

    data.forEach(event => {
      let date = new Date(event.date);

      this.events.push(new Event(event.id,event.name, date, date.getFullYear(),
      date.getMonth(), date.getDate(),
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) //hh
      + ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()), //mm
      []));

    });

  }

 loadUserEvents(characters){

   characters.map(char => {

     this.getEvents().map(event => {

       let char_event = event.players.find(c => c.id == char.id);

       if(char_event){

         // console.log(this.getUserEvents().find(e => (e.event == event && e.character == char)));

         if(!this.getUserEvents().find(e => (e.event == event && e.character == char))){


           this.setUserEvent(event, char);
         }
       }
     });

   });



       this.userEvents.sort(function(a,b) {
         return a.event.date - b.event.date;
       });

 }


 setUserEvent(event, character){
   this.userEvents.push({
     event: event,
     character: character
   });
 }

 load(){

   return this.loadEvents().pipe(mergeMap(res => {
     this.loadedEvents = true;
     return this.getEventsPlayers(this.getEvents());
   }));
 }

  loadEvents(){

    return this.ajax.send({
      dir: 'events',
      action: 'get_events',
    }).pipe(map(response => {
      if(response.success == true){
        this.loadedEvents = true;
        this.createEvents(response.data);
      } else {
        alert(response.data);
      }
      // return observableOf(true);
    }));

  }

  getEvents(){
    return this.events;
  }

  getUserEvents(){

    return this.userEvents;
  }


  getEventsPlayers(events){

    let requests = [];

    events.map(event => {
      requests.push(this.getEventPlayers(event));
    });


    return forkJoin(requests);

  }

  joinEvent(event, character){
    return this.ajax.send({
      dir: 'events',
      event_id: event.id,
      character_id: character.id,
      action: 'join_event',
    }).pipe(map(response => {
      if(response.success == true){

        this.setPlayer(event,character);

      } else {
        alert(response.data);
      }
    }));
  }

  removeEventPlayer(event_id, character_id){
    let userEvent = this.getUserEvents().find(x => x.event.id == event_id && x.character.id == character_id);

    if(event){

      let index_player = userEvent.event.players.findIndex(p => p.id == character_id);
      userEvent.event.players.splice(index_player, 1);


      let index_x = this.getUserEvents().findIndex(p => p.event.id == event_id && p.character.id == character_id);
      this.userEvents.splice(index_x, 1);
    }

  }

  leaveEvent(event_id,character_id){

    return this.ajax.send({
      dir: 'events',
      event_id: event_id,
      character_id: character_id,
      action: 'leave_event',
    }).pipe(map(response => {
      if(response.success == true){
        this.removeEventPlayer(event_id,character_id)
      } else {
        alert(response.data);
      }
    }));
  }

  setPlayer(event, player){
    let player_exist = event.players.find(x => x.id == player.id);
    if(!player_exist){
      event.players.push(Object.assign(new Character(),player));
    } else{
      player_exist = Object.assign(new Character(), player);
    }
  }

  getEventPlayers(event: Event){
    return this.ajax.send({
      dir: 'events',
      event_id: event.id,
      action: 'get_event_players',
    }).pipe(map(response => {
      if(response.success == true){
        response.data.map(player => {
          this.setPlayer(event, player);
        });
      } else {
        alert(response.data);
      }
      return event;
    }));

  }

}
