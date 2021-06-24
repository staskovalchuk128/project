import { Component } from "@angular/core";
import { AccountComponent } from "../account.component";
import { UserService } from "../../model/user.service";
import { User } from "../../model/user.model";

@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "profile.component.html"
})
export class ProfileComponent{
  user: User = new User();
  public test: string = "CIN";

  constructor(private userService: UserService) {
    Object.assign(this.user, userService.getUserData() || new User());
    console.log(this.user);

  }

}
