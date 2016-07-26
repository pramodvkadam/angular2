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
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/map');
var app_config_1 = require('../config/app.config');
require('rxjs/add/operator/toPromise');
var SericePaneService = (function () {
    function SericePaneService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._apiUrl = "";
        this._header_auth = "Authorization: ";
        this._apiUrl = _config.get("apiUrl") + "statusmonitor/logitems/";
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));
        this._notifications$ = new Subject_1.Subject();
        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
        }
    }
    SericePaneService.prototype.getAllNotifications = function (maxSize, lastRecord) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "/maxSize/lastRecord", { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }, function (error) { return console.log('Could not load logs.'); });
    };
    SericePaneService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Config])
    ], SericePaneService);
    return SericePaneService;
}());
exports.SericePaneService = SericePaneService;
//# sourceMappingURL=service-pane.service.js.map