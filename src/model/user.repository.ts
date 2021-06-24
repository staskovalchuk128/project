import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { AjaxRequests } from "../model/ajax.requests";
import { Observable } from "rxjs/Observable";



@Injectable()
export class UserRepository{
  private userData: User;

  constructor(private ajax: AjaxRequests, private router: Router) {

  }

  getUserInfo(){
    var storageUser = localStorage.getItem('USER');
    if(storageUser) {
      this.userData = JSON.parse(storageUser);
    } else{
      this.ajax.send({
        dir: 'auth',
        action: 'login'
      }).subscribe(function(data){
        console.log(data);
      });
    }

    return this.userData;

  }




}
