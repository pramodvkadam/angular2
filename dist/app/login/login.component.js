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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../auth.service');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.setMessage();
    }
    LoginComponent.prototype.setMessage = function () {
        this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in' : 'out');
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.message = 'Trying to log in ...';
        this.authService.login("GirishS", "UKY4r23ty").then(function () {
            _this.setMessage();
            if (_this.authService.isLoggedIn()) {
                // Todo: capture where the user was going and nav there.
                // Meanwhile redirect the user to the crisis admin
                //    this.router.navigate(['/statement']);
                var token = localStorage.getItem('id_token');
                console.log(_this.jwtHelper.decodeToken(token), _this.jwtHelper.getTokenExpirationDate(token), _this.jwtHelper.isTokenExpired(token));
            }
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authService.logout();
        this.setMessage();
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>LOGIN</h2>\n    <p>{{message}}</p>\n    <p>\n      <button (click)=\"login()\"  *ngIf=\"!authService.isLoggedIn()\">Login</button>\n      <button (click)=\"logout()\" *ngIf=\"authService.isLoggedIn()\">Logout</button>\n    </p>"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map