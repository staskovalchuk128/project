import { Component } from "@angular/core";
import { AccountComponent } from "../account/account.component";
import { UserService } from "../../model/user.service";
import { Router } from '@angular/router';
import { AuthenticationService } from "../../model/authentication.service";
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  template: ""
})
export class LogoutComponent{

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.logout().subscribe(r => {
      this.router.navigateByUrl("/");
    });
  }

}
