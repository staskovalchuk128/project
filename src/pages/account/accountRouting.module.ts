import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainComponent } from "./userMain.component";
import { CharactersComponent } from "./characters.component";
import { EventsComponent } from "./events.component";
import { ProfileComponent } from "./profile.component";
import { ProfileEditComponent } from "./profileEdit.component";
import { PrivacySettingsComponent } from "./privacySettings.component";
import { UserResolver } from "../../model/resolvers/user.resolver";
import { EventsResolver } from "../../model/resolvers/events.resolver";
import { UserEventsResolver } from "../../model/resolvers/userEvents.resolver";
import { CharacterResolver } from "../../model/resolvers/character.resolver";
import { AccountGuard } from '../../helpers/account.guard';

import { AccountComponent } from './account.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AccountGuard],
    children: [
      { path: "" || "main", component: UserMainComponent },
      {
        path: "profile", component: ProfileComponent,
      },
      {
        path: "characters", resolve: { model: CharacterResolver }, component: CharactersComponent,
      },
      {
        path: "events", resolve: { model: CharacterResolver, EventsResolver }, component: EventsComponent,
      },
      {
        path: "events/:mode", resolve: { model: CharacterResolver, EventsResolver }, component: EventsComponent,
      },
      {
        path: "profile/edit", component: ProfileEditComponent,
      },
      {
        path: "privacy", component: PrivacySettingsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
