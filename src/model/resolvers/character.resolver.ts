import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { CharacterService } from "../character.service";
import { MessageService } from "../../messages/message.service";
import { Message } from "../../messages/message.model";
import { map } from 'rxjs/operators';


@Injectable()
export class CharacterResolver {
  constructor(private characterService: CharacterService, private messages: MessageService) { }

    resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {

        if(this.characterService.loaded === false){
          this.messages.reportMessage(new Message("Loading data..."));

          return this.characterService.load();
        }

      }
    }
