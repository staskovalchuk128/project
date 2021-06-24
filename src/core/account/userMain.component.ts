import { Component } from "@angular/core";
import { AccountComponent } from "../account.component";
import { UserService } from "../../model/user.service";
import { Observable } from "rxjs/Observable";


@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "userMain.component.html"
})
export class UserMainComponent{

  constructor(private user: UserService) {
  }

}
