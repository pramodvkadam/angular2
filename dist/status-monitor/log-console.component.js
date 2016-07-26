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
var status_monitor_service_1 = require('./status-monitor.service');
var LogConsoleComponent = (function () {
    function LogConsoleComponent(statusService) {
        this.statusService = statusService;
    }
    LogConsoleComponent.prototype.ngOnInit = function () {
    };
    LogConsoleComponent = __decorate([
        core_1.Component({
            selector: 'log-console',
            template: "\n<div class=\"console-panel__wrap col-xs-12 col-sm-6\"  >\n    <!--<h3 class=\"console__title\">Synchronization.CRM2011.CRM2016</h3>-->\n   <!-- <select class=\"console__title form-control\" ng-change=\"vm.getConsoleLogItems(true)\" ng-model=\"vm.selectedSource\" ng-options=\"source for source in vm.sources\">\n                                                </select>\n    <div class=\"console__body\" ng-if=\"vm.consoleLogs.length\" scroll-glue>\n        <p ng-repeat=\"log in vm.consoleLogs | orderBy:'Date'\" ng-class=\"{'console--progress':log.ConsoleLogType == 0,'console--warning':log.ConsoleLogType == 1,'console--exception':log.ConsoleLogType == 2,'console--success':log.ConsoleLogType == 3}\">\n            <span ng-bind-html=\"log.Message | nl2br \"></span>\n        </p>\n    </div> -->\n    <h3>log console</h3>\n</div>\n  ",
            providers: [status_monitor_service_1.StatusService]
        }), 
        __metadata('design:paramtypes', [status_monitor_service_1.StatusService])
    ], LogConsoleComponent);
    return LogConsoleComponent;
}());
exports.LogConsoleComponent = LogConsoleComponent;
//# sourceMappingURL=log-console.component.js.map