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
require('rxjs/add/operator/map');
var app_config_1 = require('../config/app.config');
require('rxjs/add/operator/toPromise');
var StatusService = (function () {
    function StatusService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._apiUrl = "";
        this._header_auth = "Authorization: ";
        this._apiUrl = _config.get("apiUrl") + "statusmonitor/";
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));
        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
            console.log(this._header_auth);
        }
    }
    StatusService.prototype.getServices = function () {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "services", { headers: headers })
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    StatusService.prototype.getApplicationSources = function () {
        return this._http.get(this._apiUrl + "applicationsources")
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    StatusService.prototype.getLogItemDetails = function (logitemId) {
        return this._http.get(this._apiUrl + "logitem/" + logitemId)
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    StatusService.prototype.getLogItems = function (maxLogMessages, fromLogID) {
        return this._http.get(this._apiUrl + "logitems/" + maxLogMessages + "/" + fromLogID)
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    StatusService.prototype.getConsoleLogItems = function (options) {
        return this._http.put(this._apiUrl + "consolelogitems", options)
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    StatusService.prototype.getLabels = function (maxItems, applicationSourceName, fromDateTime) {
        return this._http.get(this._apiUrl + "labels/" + maxItems + "/" + applicationSourceName + "/" + fromDateTime)
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    StatusService.prototype.responseSuccess = function (response) {
        return response.json();
    };
    StatusService.prototype.responseError = function (error) {
        console.log(error.data);
        return error.data;
    };
    StatusService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Config])
    ], StatusService);
    return StatusService;
}());
exports.StatusService = StatusService;
//# sourceMappingURL=status-monitor.service.js.map