"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageViewerService = void 0;
var core_1 = require("@angular/core");
var ImageViewerService = /** @class */ (function () {
    function ImageViewerService() {
        this.currentImage = {};
        this.imageGroup = [];
    }
    ImageViewerService.prototype.setImageViewerModal = function (modal) {
        this.imageViewerModal = modal;
    };
    ImageViewerService.prototype.removeImageViewerModal = function () {
        this.imageViewerModal = '';
        this.imageGroup = [];
    };
    ImageViewerService.prototype.open = function (image) {
        this.currentImage = image;
        this.imageViewerModal.open(image);
    };
    ImageViewerService.prototype.close = function (imageSrc) {
        // close modal specified by id
        this.imageViewerModal.close();
    };
    ImageViewerService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ImageViewerService);
    return ImageViewerService;
}());
exports.ImageViewerService = ImageViewerService;
