import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Config {

    private _config: Object
    private _env: Object
    private _configCustom: Object

    constructor(private http: Http) {
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

    getEnv(key: any) {
        return this._env[key];
    }

    get(key: any) {
        return this._config[key];
    }

    setCustom(key: any, val: any) {
        this._configCustom[key] = val;
    }

    getCustom(key: any) {
        return this._configCustom[key];
    }

};