"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModule = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ajax_requests_1 = require("./ajax.requests");
var user_repository_1 = require("./user.repository");
var model_resolver_1 = require("./model.resolver");
var ModelModule = /** @class */ (function () {
    function ModelModule() {
    }
    ModelModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpClientModule],
            providers: [ajax_requests_1.AjaxRequests, user_repository_1.UserRepository, model_resolver_1.ModelResolver]
        })
    ], ModelModule);
    return ModelModule;
}());
exports.ModelModule = ModelModule;