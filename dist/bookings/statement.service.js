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
var StatementService = (function () {
    function StatementService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._apiUrl = "";
        this._acsiCommonurl = "";
        this._header_auth = "Authorization: ";
        this._apiUrl = _config.get("apiUrl") + "Statement/";
        this._acsiCommonurl = _config.get("apiUrl") + "acsi/";
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));
        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
        }
    }
    StatementService.prototype.getPaymentSummery = function (statementFilter) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "paymentsummary?Season=" + statementFilter.Season + "&CampsiteId=" + statementFilter.CampsiteId + "&PaymentType=" + statementFilter.PaymentType + "&FromDate=" + statementFilter.FromDate + "&ToDate=" + statementFilter.ToDate + "&AccountId=" + statementFilter.AccountId, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }, function (error) { return console.log('Could not load summery.'); });
    };
    StatementService.prototype.getPaymentTypes = function () {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._acsiCommonurl + "paymenttype", { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }, function (error) { return console.log('Could not load summery.'); });
    };
    StatementService.prototype.getStatementPreview = function (statementOptions) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth,
        });
        var params = new http_1.URLSearchParams();
        params.append("BookingPaymentType", statementOptions.BookingPaymentType);
        params.append("BookingSeason", statementOptions.BookingSeason);
        params.append("StartDate", statementOptions.StartDate);
        params.append("EndDate", statementOptions.EndDate);
        params.append("StatementDate", statementOptions.StatementDate);
        params.append("CampsiteId", statementOptions.CampsiteId);
        params.append("AccountId", statementOptions.AccountId);
        params.append("InvoiceOnPdf", statementOptions.InvoiceOnPdf);
        params.append("AccountLocationId", statementOptions.AccountLocationId);
        return this._http.get(this._apiUrl + "previewstatement", {
            search: params,
            headers: headers
        })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }, function (error) {
            console.log('Could not load preview data.');
            return error;
        });
    };
    StatementService.prototype.approveStatement = function (statementOptions) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.put(this._apiUrl + "approvepayment", statementOptions, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        });
    };
    StatementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Config])
    ], StatementService);
    return StatementService;
}());
exports.StatementService = StatementService;
//# sourceMappingURL=statement.service.js.map