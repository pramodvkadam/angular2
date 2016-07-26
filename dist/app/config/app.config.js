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
var Config = (function () {
    function Config(http) {
        this.http = http;
        this._config = {
            'apiUrl': 'http://service-dev.acsi.lan/b2bapi/api/',
            'authorizationUrl': 'http://service-dev.acsi.lan/b2bapi/Token',
            'version': "1.0",
            "debugging": true
        };
        this._env = {
            "env": "development"
        };
    }
    //load() {
    //    return new Promise((resolve, reject) => {
    //        this.http.get('dist/config/env.json')
    //            .map(res => res.json())
    //            .subscribe((env_data) => {
    //                this._env = env_data;
    //                this.http.get('dist/config/' + env_data.env + '.json')
    //                    .map(res => res.json())
    //                    .catch((error: any) => {
    //                        console.error(error);
    //                        return Observable.throw(error.json().error || 'Server error');
    //                    })
    //                    .subscribe((data) => {
    //                        this._config = data;
    //                        resolve(true);
    //                    });
    //            });
    //    });
    //}
    Config.prototype.getEnv = function (key) {
        return this._env[key];
    };
    Config.prototype.get = function (key) {
        return this._config[key];
    };
    Config.prototype.setCustom = function (key, val) {
        this._configCustom[key] = val;
    };
    Config.prototype.getCustom = function (key) {
        return this._configCustom[key];
    };
    Config = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Config);
    return Config;
}());
exports.Config = Config;
;
//# sourceMappingURL=app.config.js.map