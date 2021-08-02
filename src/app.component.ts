import { Component, OnInit} from "@angular/core";
import { UserService } from "./model/user.service";

@Component({
  selector: "app",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit{
  constructor(private userService: UserService){

  }

  ngOnInit(): void {
  }
}
