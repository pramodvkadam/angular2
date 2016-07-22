import { Component, OnInit }    from '@angular/core';
import {LogService, Log} from './log-console.service';
import {StatusService, Service} from '../status-monitor/status-monitor.service';
import { Observable } from 'rxjs/Observable';


export class OptionArray {
    MaxLogMessages: number = 1000;
    ApplicationSourceName: string;
    FromDate: string = null;
    Label: string = null;
}; 

@Component({
    selector : 'log-console',
    template: `
<div class="console-panel__wrap col-xs-12 col-sm-6"  >
       <h3>log console</h3>
 <p *ngFor="let log of logs$" [ngClass]="{'console--progress':log.ConsoleLogType == 0,'console--warning':log.ConsoleLogType == 1,'console--exception':log.ConsoleLogType == 2,'console--success':log.ConsoleLogType == 3}">
        {{ log.Message }}
      </p>
</div>
  `,
    providers: [LogService, StatusService]
})
export class LogConsoleComponent implements OnInit {

    logs$: Observable<Log[]>;

    applicationSources$: any;

    private selectedService: string;

    private _options = new OptionArray();

    constructor(private _logService: LogService, private _statusService: StatusService) {
            }


    ngOnInit() {

        this._statusService.getAllApplicationSources().then(data => {
            this.applicationSources$ = data;
            this.selectedService = this.applicationSources$[0];

            this._options.ApplicationSourceName = this.selectedService;
            this._logService.getAllLogs(this._options).then(data => {
                this.logs$ = data;
            });
            
        });

        
    }

}