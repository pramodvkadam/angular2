"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var log_console_service_1 = require('./log-console.service');
var status_monitor_service_1 = require('../status-monitor/status-monitor.service');
var OptionArray = (function () {
    function OptionArray() {
        this.MaxLogMessages = 1000;
        this.FromDate = null;
        this.Label = null;
    }
    return OptionArray;
}());
exports.OptionArray = OptionArray;
;
var LogConsoleComponent = (function () {
    function LogConsoleComponent(_logService, _statusService) {
        this._logService = _logService;
        this._statusService = _statusService;
        this._options = new OptionArray();
    }
    LogConsoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._statusService.getAllApplicationSources().then(function (data) {
            _this.applicationSources$ = data;
            _this.selectedService = _this.applicationSources$[0];
            _this._options.ApplicationSourceName = _this.selectedService;
            _this._logService.getAllLogs(_this._options).then(function (data) {
                _this.logs$ = data;
            });
        });
    };
    LogConsoleComponent = __decorate([
        core_1.Component({
            selector: 'log-console',
            template: "\n<div class=\"console-panel__wrap col-xs-12 col-sm-6\"  >\n       <h3>log console</h3>\n <p *ngFor=\"let log of logs$\" [ngClass]=\"{'console--progress':log.ConsoleLogType == 0,'console--warning':log.ConsoleLogType == 1,'console--exception':log.ConsoleLogType == 2,'console--success':log.ConsoleLogType == 3}\">\n        {{ log.Message }}\n      </p>\n</div>\n  ",
            providers: [log_console_service_1.LogService, status_monitor_service_1.StatusService]
        }), 
        __metadata('design:paramtypes', [log_console_service_1.LogService, status_monitor_service_1.StatusService])
    ], LogConsoleComponent);
    return LogConsoleComponent;
}());
exports.LogConsoleComponent = LogConsoleComponent;
//# sourceMappingURL=log-console.component.js.map