"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageViewerComponent = void 0;
var core_1 = require("@angular/core");
var imageViewer_service_1 = require("./imageViewer.service");
var ImageViewerComponent = /** @class */ (function () {
    function ImageViewerComponent(imageViewerService, el) {
        this.imageViewerService = imageViewerService;
        this.el = el;
        this.element = el.nativeElement;
    }
    ImageViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.body.appendChild(this.element);
        this.element.addEventListener('click', function (el) {
            if (el.target.className === 'kt_modal_wrap') {
                _this.close();
            }
        });
        this.imageViewerService.setImageViewerModal(this);
        document.addEventListener('keydown', function (e) {
            var keyCode = e.keyCode;
            if (keyCode != 39 && keyCode != 37)
                return true;
            e.preventDefault();
            _this.switchImg(keyCode == 39 ? 'next' : 'prev');
        });
    };
    ImageViewerComponent.prototype.switchImg = function (direction) {
        var index = this.imageViewerService.imageGroup.indexOf(this.imageViewerService.currentImage);
        var max_imgs = this.imageViewerService.imageGroup.length;
        if (direction == 'next') {
            index++;
        }
        else if (direction == 'prev') {
            index--;
        }
        index = index < 0 ? max_imgs - 1 : index;
        index = index > max_imgs - 1 ? 0 : index;
        this.imageViewerService.open(this.imageViewerService.imageGroup[index]);
    };
    ImageViewerComponent.prototype.ngOnDestroy = function () {
        this.imageViewerService.removeImageViewerModal();
        this.element.remove();
    };
    ImageViewerComponent.prototype.viewImg = function (image) {
        this.viewingImage.nativeElement.setAttribute('src', image.src);
    };
    ImageViewerComponent.prototype.open = function (image) {
        this.viewImg(image);
        this.element.style.display = 'block';
        document.body.classList.add('kt_modal_open');
    };
    ImageViewerComponent.prototype.close = function () {
        this.element.style.display = 'none';
        document.body.classList.remove('kt_modal_open');
    };
    __decorate([
        core_1.ViewChild('viewingImage'),
        __metadata("design:type", core_1.ElementRef)
    ], ImageViewerComponent.prototype, "viewingImage", void 0);
    ImageViewerComponent = __decorate([
        core_1.Component({
            selector: 'app-image-viewer',
            moduleId: module.id,
            templateUrl: 'imageViewer.component.html'
        }),
        __metadata("design:paramtypes", [imageViewer_service_1.ImageViewerService, core_1.ElementRef])
    ], ImageViewerComponent);
    return ImageViewerComponent;
}());
exports.ImageViewerComponent = ImageViewerComponent;
