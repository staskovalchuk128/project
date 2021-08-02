import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ModelModule } from "./model/model.module";
import { UserService } from "./model/user.service";
import { PagesModule } from "./pages/pages.module";
import { routing } from "./app.routing";
import { MessageModule } from "./messages/message.module";
import { MessageComponent } from "./messages/message.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./helpers/auth.guard";
import { AccountGuard } from "./helpers/account.guard";
import { NotFoundComponent } from "./pages/main/notFound.component";


@NgModule({
  imports: [BrowserModule, HttpClientModule, PagesModule, ModelModule, routing],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AccountGuard, UserService],
  declarations: [AppComponent, NotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
