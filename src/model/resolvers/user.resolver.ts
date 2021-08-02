import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserService } from "../user.service";
import { MessageService } from "../../messages/message.service";
import { Message } from "../../messages/message.model";
import { map } from 'rxjs/operators';


@Injectable()
export class UserResolver {
  constructor(private userService: UserService, private messages: MessageService) { }

    resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {

        if(this.userService.loadedUserData === false){
          this.messages.reportMessage(new Message("Loading data..."));

          return this.userService.loadUserData();
        }

      }
    }
