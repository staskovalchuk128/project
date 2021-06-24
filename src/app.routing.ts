import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/login/login.component";
import { RegisterComponent } from "./core/register/register.component";
import { MainPageComponent } from "./core/mainPage.component";
import { HeaderComponent } from "./core/header.component";
import { LogoutComponent } from "./core/account/logout.component";
import { AccountComponent } from "./core/account.component";
import { ProfileComponent } from "./core/account/profile.component";
import { ProfileEditComponent } from "./core/account/profileEdit.component";
import { UserMainComponent } from "./core/account/userMain.component";
import { ModelResolver } from "./model/model.resolver";
import { AccountGuard } from './helpers/account.guard';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: "", component: MainPageComponent, resolve: { model: ModelResolver } },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard], resolve: { model: ModelResolver } },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard], resolve: { model: ModelResolver } },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AccountGuard],
    children: [
      { path: "", component: UserMainComponent },
      {
        path: "profile", component: ProfileComponent,

      },
      {
        path: "profile/edit", component: ProfileEditComponent,
      }
    ],
    resolve: { model: ModelResolver }
  },
  { path: "logout", component: LogoutComponent },
  { path: '**', redirectTo: '' }
]
export const routing = RouterModule.forRoot(routes);
