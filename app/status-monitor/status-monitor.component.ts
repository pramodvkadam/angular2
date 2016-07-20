import { Component,OnInit }    from '@angular/core';
import {StatusService} from './status-monitor.service'


@Component({
  template:  `
    <h2>Status Monitor</h2>
  `,
  providers: [StatusService]
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