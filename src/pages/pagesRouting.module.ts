import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from "./mainPage.component";
import { EventsComponent } from "./events.component";
import { GalleryComponent } from "./gallery.component";
import { NewsComponent } from "./news.component";
import { UserResolver } from "../model/resolvers/user.resolver";
import { EventsResolver } from "../model/resolvers/events.resolver";
import { GalleryResolver } from "../model/resolvers/gallery.resolver";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LogoutComponent } from "./account/logout.component";
import { AuthGuard } from '../helpers/auth.guard';


import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    resolve: { model: UserResolver },
    children: [
      { path: "", component: MainPageComponent},
      { path: "events", resolve: { model: EventsResolver }, component: EventsComponent},
      { path: "gallery", resolve: { model: GalleryResolver }, component: GalleryComponent},
      { path: "news", component: NewsComponent},
      { path: "login", component: LoginComponent, canActivate: [AuthGuard]},
      { path: "register", component: RegisterComponent, canActivate: [AuthGuard]},
      {
        path: "account",
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      },
    ]
  },
  { path: "logout", component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
