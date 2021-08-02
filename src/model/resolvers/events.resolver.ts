import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { EventsService } from "../events.service";
import { MessageService } from "../../messages/message.service";
import { Message } from "../../messages/message.model";
import { map } from 'rxjs/operators';


@Injectable()
export class EventsResolver {
  constructor(private eventsService: EventsService, private messages: MessageService) { }

    resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {

        if(this.eventsService.loadedEvents === false){
          this.messages.reportMessage(new Message("Loading data..."));

          return this.eventsService.load();
        }

      }
    }
