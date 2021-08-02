import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { AjaxRequests } from "../model/ajax.requests";
import { of as observableOf,  Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  userId: number = 0;
  loaded: boolean = false;
  loadedUserData: boolean = false;
  loadedUserId: boolean = false;
  userData: Observable<User>;

  constructor(private ajax: AjaxRequests, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.userData = this.userSubject.asObservable();
  }

  setUserId(id){
    this.userId = id;
    this.loadedUserId = true;
  }

  getUserId(){
    return this.userId;
  }

  loadUserId(){

    if(this.loadedUserId === false){
      this.loadedUserId = true;
      return this.ajax.send({
        dir: 'user',
        action: 'get_user_session'
      }).pipe(map(response => {
        if(response.success == true){
          this.setUserId(response.data);
        } else {
          //user not signed in
          this.router.navigate(['/login']);
        }
      }));
    }

  }

  saveUserData(newUserData: User): Observable<any>{
    return this.ajax.send({
      dir: 'user',
      action: 'save_user_data',
      userData: JSON.stringify(newUserData)
    }).pipe(map(response => {
      if(response.success == true){
        this.setUserData(newUserData);
        return true;
      } else{
        alert(response.data);
      }
    }));
  }

  setUserData(data){
    if(data instanceof User){
      this.userSubject.next(data);
    } else{
      this.userSubject.next(new User(
        data.id, data.first_name, data.last_name, data.middle_name, data.maiden_name,
        data.email, data.birthday, data.phone, data.job, data.gender, data.create_date
      ));
    }
    this.loadedUserData = true;
  }

  loadUserData(){
    if(this.loadedUserId === true) return this.getUserDataFromServer();

    return this.loadUserId().pipe(mergeMap(r => {
      return this.getUserDataFromServer();
    }));
  }

  getUserDataFromServer(){
    let user_id = this.getUserId();

    if(user_id > 0){

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
        return this.userData;
      }));
    }

    return observableOf(false);

  }

  changeUserPassword(currentPassword, newPassword, repeatNewPassword){
    return this.ajax.send({
      dir: 'user',
      action: 'change_user_password',
      currentPassword: currentPassword,
      newPassword: newPassword,
      repeatNewPassword: repeatNewPassword
    }).pipe(map(response => {
      if(response.success == true){

      } else {
        // Error User Not Found
        alert(response.data);
      }
    }));
  }

  getUserData(){
    return this.userId > 0 ? this.userSubject.value : false;
  }


  clear(){
    this.userId = 0;
    this.loadedUserData = false;
    this.loadedUserId = false;
    this.userSubject.next(null);
  }

}
