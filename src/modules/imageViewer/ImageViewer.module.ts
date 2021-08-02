import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ImageViewerComponent } from "./imageViewer.component";
import { ImageViewerService } from "./imageViewer.service";


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ImageViewerService],
  declarations: [ImageViewerComponent],
  exports: [ImageViewerComponent]
})
export class ImageViewerModule { }
