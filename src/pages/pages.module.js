"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var header_module_1 = require("./header/header.module");
var account_module_1 = require("./account/account.module");
var message_module_1 = require("../messages/message.module");
var modal_module_1 = require("../modules/modal/modal.module");
var imageViewer_module_1 = require("../modules/imageViewer/imageViewer.module");
var mainPage_component_1 = require("./mainPage.component");
var events_component_1 = require("./events.component");
var gallery_component_1 = require("./gallery.component");
var news_component_1 = require("./news.component");
var pages_component_1 = require("./pages.component");
var pagesRouting_module_1 = require("./pagesRouting.module");
var logout_component_1 = require("./account/logout.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var calendar_module_1 = require("../modules/calendar/calendar.module");
var chunk_pipe_1 = require("../modules/calendar/chunk.pipe");
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, modal_module_1.ModalModule, imageViewer_module_1.ImageViewerModule, header_module_1.HeaderModule, forms_1.FormsModule,
                forms_1.ReactiveFormsModule, router_1.RouterModule, message_module_1.MessageModule, pagesRouting_module_1.PagesRoutingModule,
                account_module_1.AccountModule, calendar_module_1.MCalendarModule],
            declarations: [pages_component_1.PagesComponent, mainPage_component_1.MainPageComponent, events_component_1.EventsComponent, gallery_component_1.GalleryComponent, news_component_1.NewsComponent,
                logout_component_1.LogoutComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, chunk_pipe_1.ChunkPipe]
        })
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;
