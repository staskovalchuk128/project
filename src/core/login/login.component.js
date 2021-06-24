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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../../model/authentication.service");
var operators_1 = require("rxjs/operators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, formBuilder, authService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.loginForm = this.formBuilder.group({
        //   username: ['', Validators.required],
        //   password: ['', Validators.required]
        // });
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var email = form.form.value.email || '', password = form.form.value.password || '';
        if (email == '')
            return alert('Enter Email');
        if (password == '')
            return alert('Enter Password');
        this.loading = true;
        this.authService.login(email, password).pipe(operators_1.first())
            .subscribe(function (data) {
            _this.router.navigateByUrl("/account");
        }, function (error) {
            _this.loading = false;
            //  this.alertService.error(error);
            //  this.loading = false;
        });
    };
    LoginComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "login.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, authentication_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
