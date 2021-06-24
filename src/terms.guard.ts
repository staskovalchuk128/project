import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  Router
} from "@angular/router";
import { MessageService } from "./messages/message.service";
import { Message } from "./messages/message.model";
@Injectable()
export class TermsGuard {
  constructor(private messages: MessageService,
    private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean> | boolean {
      return true;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean> | boolean {
      return true;
    }
  }
