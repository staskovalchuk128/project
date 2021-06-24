import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { AjaxRequests } from "../model/ajax.requests";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: number = 0;
  loadedUserData: boolean = false;
  userData: User;

  constructor(private ajax: AjaxRequests, private router: Router) {
  }

  setUserId(id){
    this.userId = id;
  }

  getUserId(){
    return this.userId;
  }

  loadUserId(){
    var storageUser = localStorage.getItem('USER');
    let USER = JSON.parse(storageUser);
    if(USER) this.userId = USER.hasOwnProperty('id') ? USER.id : 0;

    if(this.userId == 0){

      return this.ajax.send({
        dir: 'user',
        action: 'get_user_session'
      }).pipe(map(response => {
        if(response.success == true){
          this.userId = response.data;
          // localStorage.setItem('USER', JSON.stringify({
          //   id: this.userId
          // }));
        }
      }));
    }

  }



  saveUserData(newUserData: User): Observable<User>{
    return this.ajax.send({
      dir: 'user',
      action: 'save_user_data',
      userData: JSON.stringify(newUserData)
    }).pipe(map(response => {
      if(response.success == true){
        this.userData = newUserData;
        return this.userData;
      } else{
        alert(response.data);
      }
    }));
  }

  setUserData(data){
    this.userData = new User(
      data.id, data.first_name, data.last_name, data.middle_name, data.maiden_name,
      data.email, data.birthday, data.phone, data.job, data.gender, data.create_date
    );
  }

  loadUserData(){
    let user_id = this.getUserId();

    if(user_id == 0) {
      return this.loadUserId().pipe(map(r => {
        return this.getUserDataFromServer();
      }));
    }

    return this.getUserDataFromServer();
  }

  getUserDataFromServer(){
    let user_id = this.userId;
    return this.ajax.send({
      dir: 'user',
      action: 'get_user_data',
      id: user_id
    }).pipe(map(response => {
      if(response.success == true){
        this.setUserData(response.data);
      } else {
        // Error User Not Found
        alert(response.data);
      }
      this.loadedUserData = true;
      return this.userData;
    }));
  }

  getUserData(){
    return this.userData;
  }

}
