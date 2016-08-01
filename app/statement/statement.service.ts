import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {Config} from '../config/app.config';

import 'rxjs/add/operator/toPromise';

export interface Service {
    "ID": string,
    "Date": string,
    "Source": string,
    "Subject": string,
    "Severity": string,
    "LogType": number,
    "Label": string,
    "LogTypeDescription": string,
    "Process": string,
    "Message": string,
    "StackTrace": string
}

@Injectable()
export class StatementService {

    private _apiUrl: string = "";
    private _acsiCommonurl: string = "";
    private _access_token: string;
    private _access_type: string;
    private _header_auth: string = "Authorization: ";

    constructor(private _http: Http, private _config: Config) {
        this._apiUrl = _config.get("apiUrl") + "Statement/";
        this._acsiCommonurl = _config.get("apiUrl") + "acsi/"
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));

        if (user) {
            this._access_token = user.access_token;
            this._access_type = user.token_type;
            this._header_auth = this._access_type + " " + this._access_token;
        }
    }

    getPaymentSummery(statementFilter) {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.get(`${this._apiUrl}paymentsummary?Season=${statementFilter.Season}&CampsiteId=${statementFilter.CampsiteId}&PaymentType=${statementFilter.PaymentType}&FromDate=${statementFilter.FromDate}&ToDate=${statementFilter.ToDate}&AccountId=${statementFilter.AccountId}`, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }, error => console.log('Could not load summery.'));
    }

    getPaymentTypes() {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.get(`${this._acsiCommonurl}paymenttype`, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }, error => console.log('Could not load summery.'));
    }

    getStatementPreview(statementOptions: any) {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.get(`${this._acsiCommonurl}previewstatement`+ statementOptions, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }, error => console.log('Could not load preview data.'));
    }

    approveStatement(statementOptions: any) {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.put(`${this._acsiCommonurl}approvepayment` , statementOptions, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }, error => console.log('Could not load preview data.'));
    }
    
}