import { Component,OnInit }    from '@angular/core';
import {StatusService} from './status-monitor.service';

import {LogConsoleComponent} from '../log-console/log-console.component';
import {NotificationComponent} from '../notifications/notifications.component';



@Component({
    selector : 'status-monitor',
  template:  `
<div class="container-fluid">
    <div class="status-monitor__wrap" style="padding:0; overflow:hidden;">
        <div class="tab-content">
            <log-console></log-console> <notifications></notifications>
        </div>
    </div>
</div>
  `,
  providers: [StatusService],
  directives: [LogConsoleComponent, NotificationComponent]
})
export class StatusMonitorComponent implements OnInit {

    public services: Object;

    constructor(private statusService:StatusService) {

    }

    ngOnInit() {
        this.statusService.getServices().then((services) => {
            console.log(services);
        });
    }

}