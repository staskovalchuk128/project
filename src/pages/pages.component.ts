import { Component } from "@angular/core";

@Component({
  selector: "app-pages",
  moduleId: module.id,
  template: '<app-header></app-header><paMessages></paMessages><router-outlet style="display: block; margin-top: 54px;"></router-outlet>'
})
export class PagesComponent {
  constructor(){

  }
}
