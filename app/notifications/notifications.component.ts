import { Component, OnInit }    from '@angular/core';
import {NotificationService, Notification} from './notifications.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector : 'notifications',
    template: `
<div class="message-panel__wrap  col-xs-12 col-sm-6"  >
    <h3>Notification</h3>
<div class="message__item">
        <p *ngFor="let log of notifications$"  >
            {{log.Message}}
</p>
    </div> 
</div>
  `,
    providers: [NotificationService]
})
export class NotificationComponent implements OnInit {

    notifications$: Observable<Notification[]>;

    private _maxSize: number;

    private _lastRecord: number;
   
    constructor(private _notificationService: NotificationService) {
        this._maxSize = 1000;
        this._lastRecord = 0;
    }

    ngOnInit() {
        this._notificationService.getAllNotifications(this._maxSize, this._lastRecord)
            .then(notification => {
                this.notifications$ = notification;

                console.log(this.notifications$);
            });
    }

}