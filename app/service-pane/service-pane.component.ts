import { Component, OnInit }    from '@angular/core';
import {StatusService, Service} from '../status-monitor/status-monitor.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector : 'service-pane',
    template: `
 <aside class="service-pane open">
            <div class="service-pane__wrap service-pane--close">
                <h3 class="service-pane__title"><span class="left-right-slider"></span>Services</h3>
                <ul class="service-list">
                    <li class="service-list__item" *ngFor="let service of services$">
                        <div class="service-status " ng-class="{'service__not-running':service.Color == 'Gray','service__started-and-running':service.Color == 'LightGreen','service__started-not-running':service.Color == 'Green',
                                    'service__take-long-time':service.Color == 'Orange','service__take-very-long-time':service.Color == 'Red'}">
                            <span class="service__buble"></span>
                        </div>
                        <div class="service__detail">
                            <span>{{service.Name}}</span>
                            <span>{{service.Description}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
  `,
    providers: [StatusService]
})
export class ServicePaneComponent implements OnInit {

    services$: Observable<Service[]>;

    private _maxSize: number;

    private _lastRecord: number;
   
    constructor(private _statusService: StatusService) {
        this._maxSize = 1000;
        this._lastRecord = 0;
    }

    ngOnInit() {
        this._statusService.getAllServices()
            .then(notification => {
                this.services$ = notification;
            });
    }

}