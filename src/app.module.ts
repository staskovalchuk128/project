import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { routing } from "./app.routing";
import { MessageModule } from "./messages/message.module";
import { MessageComponent } from "./messages/message.component";
import { AppComponent } from "./app.component";
import { ModelResolver } from "./model/model.resolver";
import { AuthGuard } from "./helpers/auth.guard";


@NgModule({
  imports: [BrowserModule, CoreModule, MessageModule, FormsModule, ReactiveFormsModule, routing],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
