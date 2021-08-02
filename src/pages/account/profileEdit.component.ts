import { Component } from "@angular/core";
import { AccountComponent } from "../account/account.component";
import { UserService } from "../../model/user.service";
import { User } from "../../model/user.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "profileEdit.component.html"
})
export class ProfileEditComponent{
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {
    Object.assign(this.user, userService.getUserData() || new User());
  }

  saveChanges(form: NgForm){
    if(form.valid){
      this.userService.saveUserData(this.user).subscribe(r => {
        if(typeof r !== "undefined"){
          this.user = r;
          this.router.navigateByUrl("/account/profile");
        }
      });
    }
  }

}
