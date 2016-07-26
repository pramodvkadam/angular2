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
var http_1 = require('@angular/http');
var app_config_1 = require('./config/app.config');
require('rxjs/add/operator/toPromise');
var AuthService = (function () {
    function AuthService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._loggedIn = false;
        this._authUrl = "/login";
        this._loggedIn = !!localStorage.getItem('auth_token');
        this._authUrl = _config.get("authorizationUrl");
    }
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': "application/x-www-form-urlencoded"
        });
        //return this.http
        //    .post(
        //    '/login',
        //    JSON.stringify({ email, password }),
        //    { headers }
        //    )
        //    .map(res => res.json())
        //    .map((res) => {
        //        if (res.success) {
        //            localStorage.setItem('auth_token', res.auth_token);
        //            this.loggedIn = true;
        //        }
        //        return res.success;
        //    });
        // "grant_type=password&email=GirishS&password=UKY4r23ty"
        return this._http
            .post(this._authUrl, "grant_type=password&password=UKY4r23ty&username=GirishS", { headers: headers })
            .toPromise()
            .then(function (res) {
            if (res) {
                //   localStorage.setItem('id_token', res);
                _this._loggedIn = true;
            }
            return res;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AuthService.prototype.urlEncode = function (obj) {
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append("grant_type", "password");
        for (var key in obj) {
            urlSearchParams.append(key, obj[key]);
        }
        return urlSearchParams.toString();
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this._loggedIn = false;
    };
    AuthService.prototype.isLoggedIn = function () {
        return this._loggedIn;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Config])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map