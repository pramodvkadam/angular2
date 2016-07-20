import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams} from '@angular/http';

import {Config} from '../config/app.config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatusService {


    private _apiUrl: string = "";
    private _access_token: string;
    private _access_type: string;
    private _header_auth: string = "Authorization: ";

    constructor(private _http: Http, private _config: Config) {
        this._apiUrl = _config.get("apiUrl") + "statusmonitor/";
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));

        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
            console.log(this._header_auth);
        }
    }

    getServices() {
        let headers = new Headers({
            Authorization: this._header_auth 
        });
            return this._http.get(this._apiUrl + "services", { headers: headers })
                .toPromise()
                .then(this.responseSuccess, this.responseError);
        };

        getApplicationSources() {
            return this._http.get(this._apiUrl + "applicationsources")
                .toPromise()
                .then(this.responseSuccess, this.responseError);
        };

        getLogItemDetails(logitemId:string) {
            return this._http.get(this._apiUrl + "logitem/" + logitemId)
                .toPromise()
                .then(this.responseSuccess, this.responseError);
        };

        getLogItems(maxLogMessages:number, fromLogID:string) {
            return this._http.get(this._apiUrl + "logitems/" + maxLogMessages + "/" + fromLogID)
                .toPromise()
                .then(this.responseSuccess, this.responseError);
        };
        getConsoleLogItems(options:any) {
            return this._http.put(this._apiUrl + "consolelogitems", options)
                .toPromise()
                .then(this.responseSuccess, this.responseError);
        };
        getLabels(maxItems:number, applicationSourceName:string, fromDateTime:any) {
            return this._http.get(this._apiUrl + "labels/" + maxItems + "/" + applicationSourceName + "/" + fromDateTime)
                 .toPromise()
                .then(this.responseSuccess, this.responseError);
        };

        private responseSuccess(response:any) {
            return response
        }

        private responseError(error:any) {
            console.log(error.data);
            return error.data
        }
}