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
var BookingService = (function () {
    function BookingService(_http, _config) {
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
    BookingService.prototype.getCorrectionComments = function () {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "correction/correctioncomments", { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }).catch(function (error) {
            return console.log('Could not load comments.');
        });
    };
    BookingService.prototype.getBookingList = function (campignId, season) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "correction/bookings/" + campignId + "/" + season, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }).catch(function (error) {
            return console.log('Could not load Booking.');
        });
    };
    BookingService.prototype.getGeneralCorrectionDetail = function (campignId, season) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "correction/generalbookingdetails/" + campignId + "/" + season, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }).catch(function (error) {
            return console.log('Could not load Booking.');
        });
    };
    BookingService.prototype.getBookingDetailsById = function (bookingId) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth
        });
        return this._http.get(this._apiUrl + "correction/bookingdetails/" + bookingId, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }).catch(function (error) {
            return console.log('Could not load Booking.');
        });
    };
    BookingService.prototype.saveCorrection = function (correction) {
        var headers = new http_1.Headers({
            Authorization: this._header_auth,
            "Content-Type": "application/json"
        });
        var correction = Object.assign({}, correction);
        return this._http.put(this._apiUrl + "correction/create", correction, { headers: headers }).toPromise()
            .then(function (response) { return response.json(); })
            .then(function (data) {
            return data;
        }).catch(function (error) { return error; });
    };
    BookingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Config])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=bookings.service.js.map