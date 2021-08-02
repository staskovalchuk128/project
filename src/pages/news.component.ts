import { Component} from "@angular/core";
import { UserService } from "../model/user.service";
import { ModalService  } from "../modules/modal/modal.service";

@Component({
  moduleId: module.id,
  templateUrl: 'news.component.html'
})
export class NewsComponent {
  constructor(protected userService: UserService){

  }
}
