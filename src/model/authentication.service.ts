import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AjaxRequests } from "../model/ajax.requests";
import { UserService } from "../model/user.service";
import { map } from 'rxjs/operators';

import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient, private ajax: AjaxRequests,  private userService: UserService) {

  }

  register(user: User){

    return this.ajax.send({
      dir: 'auth',
      action: 'register',
      data: JSON.stringify(user)
    }).pipe(map(response => {
      if(response.success == true){
        if(response.data.hasOwnProperty('id') && response.data.id > 0){
          this.userService.setUserId(response.data.id);
          this.userService.setUserData(response.data);
        }
        return true;
      } else{
        throw new Error(response.data);
      }
    }));
  }


  login(email, password) {
    return this.ajax.send({
      dir: 'auth',
      action: 'login',
      email: email,
      password: password
    }).pipe(map(response => {
      if(response.success == true){
        if(response.data.hasOwnProperty('id') && response.data.id > 0){
          this.userService.setUserId(response.data.id);
          this.userService.setUserData(response.data);
        }
        return true;
      } else{
        throw new Error(response.data);
      }
    }));
  }

  logout(): Observable<boolean>{
    return this.ajax.send({
      dir: 'auth',
      action: 'logout'
    }).pipe(map(response => {
      this.userService.clear();
      return true;
    }));

  }
}
