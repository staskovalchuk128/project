import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MessageModule } from "../messages/message.module";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";
import { ModelModule } from "../model/model.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MainPageComponent } from "./mainPage.component";
import { HeaderComponent } from "./header.component";
import { AccountComponent } from "./account.component";
import { UserMenuCompoment } from "./account/userMenu.component";
import { ProfileComponent } from "./account/profile.component";
import { ProfileEditComponent } from "./account/profileEdit.component";
import { UserMainComponent } from "./account/userMain.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, ModelModule, RouterModule, MessageModule],
  declarations: [LoginComponent, RegisterComponent, MainPageComponent, HeaderComponent, AccountComponent,
    UserMenuCompoment, ProfileComponent, ProfileEditComponent, UserMainComponent],
  exports: [ModelModule, HeaderComponent],
})
export class CoreModule { }
