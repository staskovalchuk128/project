import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [ModalService],
  declarations: [ModalComponent],
  exports: [ModalComponent]
})
export class ModalModule { }
