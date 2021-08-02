"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var modal_module_1 = require("../../modules/modal/modal.module");
var header_module_1 = require("../header/header.module");
var message_module_1 = require("../../messages/message.module");
var account_component_1 = require("./account.component");
var accountRouting_module_1 = require("./accountRouting.module");
var events_component_1 = require("../account/events.component");
var characters_component_1 = require("../account/characters.component");
var userMenu_component_1 = require("../account/userMenu.component");
var profile_component_1 = require("../account/profile.component");
var profileEdit_component_1 = require("../account/profileEdit.component");
var privacySettings_component_1 = require("../account/privacySettings.component");
var userMain_component_1 = require("../account/userMain.component");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, modal_module_1.ModalModule, header_module_1.HeaderModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule, message_module_1.MessageModule, accountRouting_module_1.AccountRoutingModule],
            declarations: [account_component_1.AccountComponent, userMenu_component_1.UserMenuCompoment, profile_component_1.ProfileComponent, events_component_1.EventsComponent, characters_component_1.CharactersComponent,
                profileEdit_component_1.ProfileEditComponent, privacySettings_component_1.PrivacySettingsComponent, userMain_component_1.UserMainComponent],
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
