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
exports.Gallery = exports.GalleryService = void 0;
var core_1 = require("@angular/core");
var ajax_requests_1 = require("../model/ajax.requests");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var GalleryService = /** @class */ (function () {
    function GalleryService(ajax, router) {
        this.ajax = ajax;
        this.router = router;
        this.loadedGallery = false;
        this.gallery = [];
    }
    GalleryService.prototype.setGallery = function (data) {
        var _this = this;
        data.map(function (i) {
            _this.gallery.push(new Gallery(i.id, i.name));
        });
    };
    GalleryService.prototype.loadGallery = function () {
        var _this = this;
        return this.ajax.send({
            dir: 'gallery',
            action: 'get_gallery',
        }).pipe(operators_1.map(function (response) {
            if (response.success == true) {
                _this.loadedGallery = true;
                _this.setGallery(response.data);
            }
            else {
                alert(response.data);
            }
            return rxjs_1.of(true);
        }));
    };
    GalleryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ajax_requests_1.AjaxRequests, router_1.Router])
    ], GalleryService);
    return GalleryService;
}());
exports.GalleryService = GalleryService;
var Gallery = /** @class */ (function () {
    function Gallery(id, name) {
        this.id = id;
        this.name = name;
    }
    return Gallery;
}());
exports.Gallery = Gallery;
