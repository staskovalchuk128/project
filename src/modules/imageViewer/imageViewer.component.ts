import { Component, ViewEncapsulation, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { ImageViewerService } from './imageViewer.service';

@Component({
    selector: 'app-image-viewer',
    moduleId: module.id,
    templateUrl: 'imageViewer.component.html'
})
export class ImageViewerComponent implements OnInit, OnDestroy {
    @ViewChild('viewingImage') viewingImage: ElementRef;
    private element: any;

    constructor(private imageViewerService: ImageViewerService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        document.body.appendChild(this.element);
        this.element.addEventListener('click', el => {
            if (el.target.className === 'kt_modal_wrap') {
                this.close();
            }
        });
        this.imageViewerService.setImageViewerModal(this);

        document.addEventListener('keydown', e => { // swith next and prev
          let keyCode = e.keyCode;
          if(keyCode != 39 && keyCode != 37) return true;
          e.preventDefault();
          this.switchImg(keyCode == 39 ? 'next' : 'prev');
        });

    }


    switchImg(direction){

      let index = this.imageViewerService.imageGroup.indexOf(this.imageViewerService.currentImage);
      let max_imgs = this.imageViewerService.imageGroup.length;

      if(direction == 'next'){
        index++;
      } else if(direction == 'prev'){
        index--;
      }

      index = index < 0 ? max_imgs - 1 : index;
      index = index > max_imgs - 1 ? 0 : index;

      this.imageViewerService.open(this.imageViewerService.imageGroup[index]);


    }

    ngOnDestroy(): void {
      this.imageViewerService.removeImageViewerModal();
      this.element.remove();
    }


    viewImg(image){
      this.viewingImage.nativeElement.setAttribute('src',image.src);
    }

    open(image): void {

      this.viewImg(image);

      this.element.style.display = 'block';
      document.body.classList.add('kt_modal_open');

    }

    close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('kt_modal_open');
    }
}
