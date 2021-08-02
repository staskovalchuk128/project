import { Component, OnInit, OnDestroy } from "@angular/core";
import { AccountComponent } from "../account/account.component";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../model/user.service";
import { Observable } from "rxjs/Observable";
import { EventsService } from "../../model/events.service";
import { ModalService  } from "../../modules/modal/modal.service";
import { Event } from "../../model/event.model";
import { CharacterService, Character } from "../../model/character.service";

@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "events.component.html"
})
export class EventsComponent implements OnInit{
  currentView: string;
  currentEvent: Event = new Event();
  character: Character = new Character();
  modalInfoTitle: string;
  modalEventId: string = 'event_info_modal';
  modalOpened: boolean = false;
  joinEventDisplay: string = 'none';

  constructor(private user: UserService, private eventsService: EventsService,
    private modalService: ModalService, private characterService: CharacterService,
    private activeRoute: ActivatedRoute) {

      this.activeRoute.params.subscribe(params => {
        var mode = this.activeRoute.snapshot.params["mode"];
        if(mode == 'myEvents') {
          this.currentView = 'myEvents';
          this.eventsService.loadUserEvents(this.getCharacters());
        }
        else this.currentView = 'allEvents';
      });

  }

  ngOnInit(){

  }


  getCharacters(){
    return this.characterService.getUserCharacters();
  }

  getEvents(){
    return this.eventsService.getEvents();
  }

  getMyEvents(){
    return this.eventsService.getUserEvents();
  }

  leaveEvent(event, character_id){
    this.eventsService.leaveEvent(event, character_id).subscribe(res => {
    });
  }

  joinEvent(){
    this.eventsService.joinEvent(this.currentEvent, this.character).subscribe(res => {
      this.updateEventPlayers(this.currentEvent);
      this.joinEventDisplay = 'none';
    });
  }

  pickChar(id){
    let find_char = this.getCharacters().find(x => x.id == id);
    return this.character = !find_char ? new Character() : this.getCharacters().find(x => x.id == id);
  }

  openJoinEvent(event: Event){
    this.joinEventDisplay = 'block';
    if(this.modalOpened == false) this.openEventInfoModal(this.modalEventId, event);
  }

  seeEventInfo(event: Event){
    this.joinEventDisplay = 'none';
    this.openEventInfoModal(this.modalEventId, event);
  }

  openEventInfoModal(id: string, event: Event) {


    this.eventsService.getEventPlayers(event).subscribe(result => {

      this.modalInfoTitle = event.time + ' - ' + event.name;

      this.updateEventPlayers(event);

      this.currentEvent = event;
      this.modalService.open(id);
      this.modalOpened = true;
    });

  }

  updateEventPlayers(event){
    var html = '';

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
    document.getElementById('event_players').innerHTML = html;
  }

  closeEventInfoModal(id: string) {
    this.modalService.close(id);
    this.modalOpened = false;
  }


}
