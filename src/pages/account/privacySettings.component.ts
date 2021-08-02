import { Component } from "@angular/core";
import { AccountComponent } from "../account/account.component";
import { UserService } from "../../model/user.service";
import { User } from "../../model/user.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "privacySettings.component.html"
})
export class PrivacySettingsComponent{

  constructor(private userService: UserService, private router: Router) {
  }

  changePassword(form: NgForm){
    let currentPassword = form.form.value.currentPassword || '', newPassword = form.form.value.newPassword || '', repeatNewPassword = form.form.value.repeatNewPassword || '';
    if(currentPassword == '') return alert('Enter your current password');
    if(newPassword == '') return alert('Enter new password');
    if(repeatNewPassword == '') return alert('Repeat new password');
    if(newPassword != repeatNewPassword) return alert('Passwords don\'t match');

    if(form.valid){
      this.userService.changeUserPassword(currentPassword,newPassword,repeatNewPassword).subscribe(r => {
        console.log(r);
      });
    }
  }


}
