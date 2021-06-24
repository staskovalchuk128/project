import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app",
  moduleId: module.id,
  templateUrl: 'MainPage.component.html'
})
export class MainPageComponent {
  pik = 'Shitty';
  constructor(activeRoute: ActivatedRoute){
    activeRoute.params.subscribe(params => {
      this.pik = 'Shitty';
      console.log(params);

    });
  }

}
