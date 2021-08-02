import { Component, Output } from "@angular/core";
import { UserService } from "../model/user.service";

@Component({
  moduleId: module.id,
  templateUrl: 'MainPage.component.html'
})
export class MainPageComponent {
  public userId: number = 50;
  constructor(protected userService: UserService){
    this.userId = userService.getUserId();
  }

}
