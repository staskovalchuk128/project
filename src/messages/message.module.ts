import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";
import { MessageErrorHandler } from "./errorHandler";
import { RouterModule } from "@angular/router";
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MessageComponent],
  exports: [MessageComponent],
  providers: [MessageService,
    { provide: ErrorHandler, useClass: MessageErrorHandler }]
  })
  export class MessageModule { }
