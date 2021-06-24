import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AjaxRequests } from "./ajax.requests";
import { UserRepository } from "./user.repository";
import { ModelResolver } from "./model.resolver";
@NgModule({
  imports: [HttpClientModule],
  providers: [AjaxRequests, UserRepository, ModelResolver]
})
export class ModelModule { }
