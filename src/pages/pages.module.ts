import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HeaderModule } from "./header/header.module";
import { AccountModule } from "./account/account.module";
import { MessageModule } from "../messages/message.module";
import { ModalModule } from "../modules/modal/modal.module";
import { ImageViewerModule } from "../modules/imageViewer/imageViewer.module";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";
import { MainPageComponent } from "./mainPage.component";
import { EventsComponent } from "./events.component";
import { GalleryComponent } from "./gallery.component";
import { NewsComponent } from "./news.component";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pagesRouting.module";
import { LogoutComponent } from "./account/logout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MCalendarModule } from "../modules/calendar/calendar.module";
import { ChunkPipe } from "../modules/calendar/chunk.pipe";

@NgModule({
  imports: [CommonModule, ModalModule, ImageViewerModule, HeaderModule, FormsModule,
    ReactiveFormsModule, RouterModule, MessageModule, PagesRoutingModule,
    AccountModule, MCalendarModule],
  declarations: [PagesComponent, MainPageComponent, EventsComponent, GalleryComponent, NewsComponent,
    LogoutComponent, LoginComponent, RegisterComponent, ChunkPipe]
})
export class PagesModule { }
