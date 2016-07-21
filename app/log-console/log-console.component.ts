import { Component, OnInit }    from '@angular/core';
import {LogService} from './log-console.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector : 'log-console',
    template: `
<div class="console-panel__wrap col-xs-12 col-sm-6"  >
    <!--<h3 class="console__title">Synchronization.CRM2011.CRM2016</h3>-->
   <!-- <select class="console__title form-control" ng-change="vm.getConsoleLogItems(true)" ng-model="vm.selectedSource" ng-options="source for source in vm.sources">
                                                </select>
    <div class="console__body" ng-if="vm.consoleLogs.length" scroll-glue>
        <p ng-repeat="log in vm.consoleLogs | orderBy:'Date'" ng-class="{'console--progress':log.ConsoleLogType == 0,'console--warning':log.ConsoleLogType == 1,'console--exception':log.ConsoleLogType == 2,'console--success':log.ConsoleLogType == 3}">
            <span ng-bind-html="log.Message | nl2br "></span>
        </p>
 <p *ngFor="let log of logs$ | async">
        {{ log.Message }}
      </p>
    </div> -->
    <h3>log console</h3>
</div>
  `,
    providers: [LogService]
})
export class LogConsoleComponent implements OnInit {

    logs$: Observable<Log[]>;

    private options  = {};

    constructor(private _logService: LogService) {

    }


    ngOnInit() {
        this.logs$ = this._logService.logs$;

        this._logService.getAllLogs(this.options);
    }

}