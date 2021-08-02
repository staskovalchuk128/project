import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "../../modules/modal/modal.module";
import { HeaderModule } from "../header/header.module";
import { MessageModule } from "../../messages/message.module";
import { MessageService } from "../../messages/message.service";
import { Message } from "../../messages/message.model";
import { AccountComponent } from "./account.component";
import { AccountRoutingModule } from "./accountRouting.module";
import { EventsComponent } from "../account/events.component";
import { CharactersComponent } from "../account/characters.component";
import { UserMenuCompoment } from "../account/userMenu.component";
import { ProfileComponent } from "../account/profile.component";
import { ProfileEditComponent } from "../account/profileEdit.component";
import { PrivacySettingsComponent } from "../account/privacySettings.component";
import { UserMainComponent } from "../account/userMain.component";

@NgModule({
  imports: [CommonModule, ModalModule, HeaderModule, FormsModule, ReactiveFormsModule, RouterModule, MessageModule, AccountRoutingModule],
  declarations: [AccountComponent, UserMenuCompoment, ProfileComponent, EventsComponent, CharactersComponent,
    ProfileEditComponent, PrivacySettingsComponent, UserMainComponent],
})
export class AccountModule { }
