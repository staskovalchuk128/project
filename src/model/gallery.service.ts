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
export class GalleryService {
  loadedGallery: boolean = false;
  gallery = [];

  constructor(private ajax: AjaxRequests, private router: Router) {
  }


  setGallery(data){
    data.map(i => {
      this.gallery.push(new Gallery(i.id, i.name));
    });
  }

  loadGallery(){

    return this.ajax.send({
      dir: 'gallery',
      action: 'get_gallery',
    }).pipe(map(response => {
      if(response.success == true){
        this.loadedGallery = true;
        this.setGallery(response.data);
      } else {
        alert(response.data);
      }
      return observableOf(true);
    }));

  }

}



export class Gallery {
  constructor(public id?: number,
    public name?: string,
    ) {}
  }
