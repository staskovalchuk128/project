"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjaxRequests = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
// import "rxjs/add/operator/map";
var AjaxRequests = /** @class */ (function () {
    function AjaxRequests(http) {
        this.http = http;
        this.url = '/application/ajax.php';
    }
    AjaxRequests.prototype.send = function (requestData) {
        return this.sendRequest("POST", requestData);
    };
    AjaxRequests.prototype.sendRequest = function (method, body) {
        var params = new http_1.HttpParams();
        if (body) {
            params = params.appendAll(body);
        }
        var httpOptions = {
            headers: new http_1.HttpHeaders()
        };
        switch (method) {
            case "POST":
                return this.http.post(this.url, params, httpOptions);
                break;
            case "PUT":
                return this.http.put(this.url, body, httpOptions);
                break;
            case "DELETE":
                return this.http.delete(this.url, httpOptions);
                break;
            default:
                return this.http.get(this.url, httpOptions);
                break;
        }
    };
    AjaxRequests = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AjaxRequests);
    return AjaxRequests;
}());
exports.AjaxRequests = AjaxRequests;
