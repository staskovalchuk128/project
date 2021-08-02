import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { GalleryService } from "../gallery.service";
import { MessageService } from "../../messages/message.service";
import { Message } from "../../messages/message.model";
import { map } from 'rxjs/operators';


@Injectable()
export class GalleryResolver {
  constructor(private galleryService: GalleryService, private messages: MessageService) { }

    resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {

        if(this.galleryService.loadedGallery === false){
          this.messages.reportMessage(new Message("Loading data..."));

          return this.galleryService.loadGallery();
        }

      }
    }
