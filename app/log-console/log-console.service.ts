import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {Config} from '../config/app.config';

import 'rxjs/add/operator/toPromise';

export interface Log {
    ID: string,
    Date: any,
    ApplicationSource: string,
    Message: string,
    ConsoleLogType: number
}

@Injectable()
export class LogService {

    private _apiUrl: string = "";
    private _access_token: string;
    private _access_type: string;
    private _header_auth: string = "Authorization: ";
    private _logs$: Subject<Log[]>;
    private dataStore: {
        logs: Log[]
    };


    constructor(private _http: Http, private _config: Config) {
        this._apiUrl = _config.get("apiUrl") + "statusmonitor/consolelogitems";
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));

        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
            this.dataStore = { logs: [] };
            this._logs$ = <Subject<Log[]>>new Subject();
        }
    }


    get logs$() {
        return this._logs$.asObservable();
    }

    getAllLogs(options: any) {
            let headers = new Headers({
            Authorization: this._header_auth 
        });
            return this._http.put(`${this._apiUrl}`, options, { headers: headers })
                .toPromise()
                .then(response => response.json())
                .then(data => {
                return data;
        }, error => console.log('Could not load logs.'));
    }

    getServices() {
        let headers = new Headers({
            Authorization: this._header_auth 
        });
            return this._http.get(this._apiUrl + "services", { headers: headers })
                .toPromise()
                .then(this.responseSuccess, this.responseError);
        };

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

        private responseSuccess(response:any) {
            return response.json();
        }

        private responseError(error:any) {
            console.log(error.data);
            return error.data
        }
}