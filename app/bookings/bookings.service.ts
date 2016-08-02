import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {Config} from '../config/app.config';

import 'rxjs/add/operator/toPromise';

export interface Bookings 
    {
    "BookingId": string,
        "BookingNumber": number,
        "CustomerName": string,
            "StartDate": string,
            "EndDate": string,
            "Status": string,
            "GrossAmount": number
}


export interface BookingList {
    "CampingId": number,
        "CampsiteId": string,
            "Name": string,
            "GeneralBookingId": string,
            "Bookings": Bookings[]
}

export interface Correction {
    CampingId: number,
    BookingId?: string,
    BookingNumber?: number,
    Name: string,
    Description?: string,
    IsCampsiteCorrection: boolean,
    IsCancellationCorrection: boolean,
    GrossAmount?: number,
    CommissionAmount?: number,
    PaymentAmount?: number,
    FinalPaymentDate?: any,
    CancellationAmount?: number,
    CommissionPercentage?: number,
    CorrectionCommentId?: number,
    NetCorrectionAmount?:number
}

@Injectable()
export class BookingService {

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

    getCorrectionComments() {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.get(`${this._apiUrl}correction/correctioncomments`, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }).catch(error =>
                console.log('Could not load comments.')
            );
    }


    getBookingList(campignId:number,season:number) {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.get(`${this._apiUrl}correction/bookings/${campignId}/${season}`, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }).catch(error =>
                console.log('Could not load Booking.')
            );
    }

    getGeneralCorrectionDetail(campignId: number, season: number) {
        let headers = new Headers({
            Authorization: this._header_auth
        });
        return this._http.get(`${this._apiUrl}correction/generalbookingdetails/${campignId}/${season}`, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .then(data => {
                return data;
            }).catch(error =>
                console.log('Could not load Booking.')
            );
    }

    
}