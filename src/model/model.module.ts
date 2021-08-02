import { NgModule } from "@angular/core";
import { AjaxRequests } from "./ajax.requests";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./resolvers/user.resolver";
import { EventsResolver } from "./resolvers/events.resolver";
import { CharacterResolver } from "./resolvers/character.resolver";
import { GalleryResolver } from "./resolvers/gallery.resolver";
@NgModule({
  providers: [AjaxRequests, UserRepository, UserResolver, EventsResolver,
    GalleryResolver, CharacterResolver]
})
export class ModelModule { }
