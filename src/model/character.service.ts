import { Injectable } from '@angular/core';
import { Event } from "./event.model";
import { UserRepository } from "./user.repository";
import { AjaxRequests } from "../model/ajax.requests";
import { of as observableOf,  Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  loaded: boolean = false;
  characterClasses = [];
  userCharacters = [];

  constructor(private ajax: AjaxRequests, private router: Router) {
  }


  load(){
    return forkJoin([this.loadClasses(),this.loadUserCharacters()]);
  }

  loadClasses(){

    return this.ajax.send({
      dir: 'character',
      action: 'get_classes',
    }).pipe(map(response => {
      if(response.success == true){
        this.characterClasses = response.data;
      } else {
        alert(response.data);
      }
      return observableOf(true);
    }));

  }

  getCharacterClasses(){
    return this.characterClasses;
  }

  getUserCharacters(){
    return this.userCharacters;
  }

  addUserCharacter(data){

    return this.ajax.send({
      dir: 'user',
      action: 'add_character',
      id: data.id,
      name: data.name,
      class_id: data.class_id,
      level: data.level
    }).pipe(map(response => {
      if(response.success == true){
        data.id = response.data.character_id;
        this.addCharacter(data);
      } else{
        alert(response.data);
      }
    }));
  }

  addCharacter(data){
    let index = this.userCharacters.findIndex(p => p.id == data.id);
    if(data instanceof Character){
      if (index == -1) this.userCharacters.push(data);
      else this.userCharacters.splice(index,1,data);
    } else{
      if (index == -1){ this.userCharacters.push(new Character(data.id, data.name, data.class_id,
          data.class_name, data.class_icon,data.level));
      } else{
        //the same
      }
    }
  }


  deleteCharacter(id){

    let index = this.userCharacters.findIndex(p => p.id == id);
    if (index > -1) {

      return this.ajax.send({
        dir: 'user',
        id: id,
        action: 'delete_character',
      }).pipe(map(response => {
        if(response.success == true){
          this.userCharacters.splice(index, 1);
        } else {
          alert(response.data);
        }
        return observableOf(true);
      }));

    }

    alert('Character not found');

  }


  loadUserCharacters(){
    return this.ajax.send({
      dir: 'user',
      action: 'get_characters',
    }).pipe(map(response => {
      if(response.success == true){
        response.data.map(char => {
          this.addCharacter(char);
        });
      } else {
        alert(response.data);
      }
      return observableOf(true);
    }));

  }

}



export class Character {
  constructor(public id?: number,
    public name?: string,
    public class_id?: number,
    public class_name?: string,
    public class_icon?: string,
    public level?: number
    ) {}
  }
