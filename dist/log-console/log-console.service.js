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
var LogService = (function () {
    function LogService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._apiUrl = "";
        this._header_auth = "Authorization: ";
        this._apiUrl = _config.get("apiUrl") + "statusmonitor/consolelogitems";
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));
        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
            this.dataStore = { logs: [] };
            this._logs$ = new Subject_1.Subject();
        }
    }
    Object.defineProperty(LogService.prototype, "logs$", {
        get: function () {
            return this._logs$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    LogService.prototype.getAllLogs = function (options) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.put("" + this._apiUrl, options, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }, function (error) { return console.log('Could not load logs.'); });
    };
    LogService.prototype.getServices = function () {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "services", { headers: headers })
            .toPromise()
            .then(this.responseSuccess, this.responseError);
    };
    ;
    //    getApplicationSources() {
    //        return this._http.get(this._apiUrl + "applicationsources")
    //            .toPromise()
    //            .then(this.responseSuccess, this.responseError);
    //    };
    //    getLogItemDetails(logitemId:string) {
    //        return this._http.get(this._apiUrl + "logitem/" + logitemId)
    //            .toPromise()
    //            .then(this.responseSuccess, this.responseError);
    //    };
    //    getLogItems(maxLogMessages:number, fromLogID:string) {
    //        return this._http.get(this._apiUrl + "logitems/" + maxLogMessages + "/" + fromLogID)
    //            .toPromise()
    //            .then(this.responseSuccess, this.responseError);
    //    };
    //    getConsoleLogItems(options:any) {
    //        return this._http.put(this._apiUrl + "consolelogitems", options)
    //            .toPromise()
    //            .then(this.responseSuccess, this.responseError);
    //    };
    //    getLabels(maxItems:number, applicationSourceName:string, fromDateTime:any) {
    //        return this._http.get(this._apiUrl + "labels/" + maxItems + "/" + applicationSourceName + "/" + fromDateTime)
    //             .toPromise()
    //            .then(this.responseSuccess, this.responseError);
    //    };
    LogService.prototype.responseSuccess = function (response) {
        return response.json();
    };
    LogService.prototype.responseError = function (error) {
        console.log(error.data);
        return error.data;
    };
    LogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Config])
    ], LogService);
    return LogService;
}());
exports.LogService = LogService;
//# sourceMappingURL=log-console.service.js.map