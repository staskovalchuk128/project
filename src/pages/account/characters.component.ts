import { Component } from "@angular/core";
import { AccountComponent } from "../account/account.component";
import { UserService } from "../../model/user.service";
import { Observable } from "rxjs/Observable";
import { CharacterService, Character } from "../../model/character.service";
import { map } from 'rxjs/operators';


@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "characters.component.html"
})
export class CharactersComponent{
  editing: boolean = false;

  character: Character = new Character();

  constructor(private user: UserService, private characterService: CharacterService) {
  }

  get_classes(){
    return this.characterService.getCharacterClasses();
  }

  getCharacters(){
    return this.characterService.getUserCharacters();
  }

  editCharacter(id){
    this.editing = true;
    this.character = this.characterService.getUserCharacters().find(x => x.id == id);
  }

  deleteCharacter(id){
    if(!confirm('Are you sure you want to delete this character?')) return false;

    this.characterService.deleteCharacter(id).subscribe(r => {

    });
  }

  addCharacter(form){

    if(!this.character.name) return alert('Enter name');
    if(!this.character.class_id) return alert('Select a class');
    if(!this.character.level) return alert('Enter level');

    this.character.level = this.character.level <= 0 ? 1 : this.character.level;

    let class_info = this.get_classes().find(x => x.id == this.character.class_id);
    if(class_info){
      this.character.class_icon = class_info.icon;
      this.character.class_name = class_info.name;
    }



    this.characterService.addUserCharacter(this.character).subscribe(r => {
      this.character = new Character();
      this.editing = false;
      setTimeout(() => {
        form.reset();
      }, 0);
    });

  }



}
