import { Component} from "@angular/core";
import { UserService } from "../model/user.service";
import { GalleryService } from "../model/gallery.service";
import { ModalService  } from "../modules/modal/modal.service";
import { ImageViewerService  } from "../modules/imageViewer/imageViewer.service";

@Component({
  moduleId: module.id,
  templateUrl: 'gallery.component.html'
})
export class GalleryComponent {



  constructor(protected imageViewerService: ImageViewerService, protected galleryService: GalleryService){

    galleryService.gallery.map(img => {
      imageViewerService.imageGroup.push({
        id: img.id,
        name: img.name,
        src: '/images/gallery/' + img.name
      });
    });


  }


  viewImg(event, image){
    event.stopImmediatePropagation();
    event.preventDefault();
    var target = event.target || event.srcElement || event.currentTarget;

    this.imageViewerService.open(image);

  }

}
