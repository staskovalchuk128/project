import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../model/user.service";
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';


@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.userService.loadedUserId === true){
      if(this.userService.getUserId() == 0) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

    return this.userService.loadUserId().pipe(map(r => {
      let userId = this.userService.getUserId();
      if (userId > 0) return true;
      this.router.navigate(['/login']);
      return false;
    }));

  }
}
