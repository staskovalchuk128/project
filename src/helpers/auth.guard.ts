import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../model/user.service";
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.loadUserId().pipe(map(r => {
      let userId = this.userService.getUserId();

      if (userId > 0) {

        // if(state.url == '/login' || state.url == 'register'){
        //   this.router.navigate(['/account']);
        // }

        // authorised so return true
        return true;
      }

      // not logged in so redirect to login page with the return url
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      this.router.navigate(['/login']);
      return false;


    }));

  }
}
