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
var log_console_component_1 = require('../log-console/log-console.component');
var notifications_component_1 = require('../notifications/notifications.component');
var service_pane_component_1 = require('../service-pane/service-pane.component');
var StatusMonitorComponent = (function () {
    function StatusMonitorComponent() {
    }
    StatusMonitorComponent.prototype.ngOnInit = function () {
    };
    StatusMonitorComponent = __decorate([
        core_1.Component({
            selector: 'status-monitor',
            template: "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"tab-content\">\n          <notifications></notifications>   <log-console></log-console>\n        </div>\n<service-pane></service-pane>\n    </div>\n</div>\n  ",
            directives: [log_console_component_1.LogConsoleComponent, notifications_component_1.NotificationComponent, service_pane_component_1.ServicePaneComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], StatusMonitorComponent);
    return StatusMonitorComponent;
}());
exports.StatusMonitorComponent = StatusMonitorComponent;
//# sourceMappingURL=status-monitor.component.js.map