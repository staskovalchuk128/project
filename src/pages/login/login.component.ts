import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { AuthenticationService } from "../../model/authentication.service";
import { first } from 'rxjs/operators';


@Component({
  selector: "app-login",
  moduleId: module.id,
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit{
  loading = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService) {
    }

    ngOnInit() {
      // this.loginForm = this.formBuilder.group({
      //   username: ['', Validators.required],
      //   password: ['', Validators.required]
      // });
    }

    onSubmit(form){
      let email = form.form.value.email || '', password = form.form.value.password || '';
      if(email == '') return alert('Enter Email');
      if(password == '') return alert('Enter Password');

      this.loading = true;
      this.authService.login(email,password).pipe(first())
      .subscribe(
        data => {
          this.router.navigateByUrl("/account");
        },
        error => {
          alert(error);
          this.loading = false;
          //  this.alertService.error(error);
          //  this.loading = false;
        });

      }


      validateEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    }
