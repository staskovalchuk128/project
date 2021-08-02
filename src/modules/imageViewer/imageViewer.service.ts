import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageViewerService {
  imageViewerModal: any;
  imageName;
  currentImage = {};
  imageGroup = [];

  setImageViewerModal(modal){
    this.imageViewerModal = modal;
  }

  removeImageViewerModal(){
    this.imageViewerModal = '';
    this.imageGroup = [];
  }

  open(image) {
    this.currentImage = image;
    this.imageViewerModal.open(image);
  }

  close(imageSrc) {
      // close modal specified by id
      this.imageViewerModal.close();
  }

}
