import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams} from '@angular/http';

import {Config} from './config/app.config';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
   
    private _loggedIn: boolean = false;
    private _authUrl: string = "/login";

    constructor(private _http: Http, private _config: Config) {
        this._loggedIn = !!localStorage.getItem('acsi_b2b_user');
        this._authUrl = _config.get("authorizationUrl");
    }

    login(email, password) {
        let headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded"
        });

        return this._http
            .post(this._authUrl, "grant_type=password&password=UKY4r23ty&username=GirishS" , { headers: headers })
            .toPromise()
            .then(res => res.json())
            .then(res => {              
                if (res) {
                    localStorage.setItem('acsi_b2b_user', JSON.stringify(res));
                    this._loggedIn = true;
                }

                return res;
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private urlEncode(obj: Object): string {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("grant_type", "password");
    for (let key in obj) {
        urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
}

    logout() {
        localStorage.removeItem('acsi_b2b_user');
        this._loggedIn = false;
    }

    isLoggedIn() {
        return this._loggedIn;
    }
}