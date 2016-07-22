import { Component,OnInit }    from '@angular/core';

import {LogConsoleComponent} from '../log-console/log-console.component';
import {NotificationComponent} from '../notifications/notifications.component';
import {ServicePaneComponent} from '../service-pane/service-pane.component';



@Component({
    selector : 'status-monitor',
  template:  `
<div class="container-fluid">
    <div class="row">
        <div class="tab-content">
          <notifications></notifications>   <log-console></log-console>
        </div>
<service-pane></service-pane>
    </div>
</div>
  `,
  directives: [LogConsoleComponent, NotificationComponent, ServicePaneComponent]
})
export class StatusMonitorComponent implements OnInit {

    public services: Object;

    constructor() {

    }

    ngOnInit() {
       
    }

}