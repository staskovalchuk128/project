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
exports.GalleryComponent = void 0;
var core_1 = require("@angular/core");
var gallery_service_1 = require("../model/gallery.service");
var imageViewer_service_1 = require("../modules/imageViewer/imageViewer.service");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(imageViewerService, galleryService) {
        this.imageViewerService = imageViewerService;
        this.galleryService = galleryService;
        galleryService.gallery.map(function (img) {
            imageViewerService.imageGroup.push({
                id: img.id,
                name: img.name,
                src: '/images/gallery/' + img.name
            });
        });
    }
    GalleryComponent.prototype.viewImg = function (event, image) {
        event.stopImmediatePropagation();
        event.preventDefault();
        var target = event.target || event.srcElement || event.currentTarget;
        this.imageViewerService.open(image);
    };
    GalleryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'gallery.component.html'
        }),
        __metadata("design:paramtypes", [imageViewer_service_1.ImageViewerService, gallery_service_1.GalleryService])
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
