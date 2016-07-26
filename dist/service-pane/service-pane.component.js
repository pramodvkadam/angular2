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
var status_monitor_service_1 = require('../status-monitor/status-monitor.service');
var ServicePaneComponent = (function () {
    function ServicePaneComponent(_statusService) {
        this._statusService = _statusService;
        this._maxSize = 1000;
        this._lastRecord = 0;
    }
    ServicePaneComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._statusService.getAllServices()
            .then(function (notification) {
            _this.services$ = notification;
        });
    };
    ServicePaneComponent = __decorate([
        core_1.Component({
            selector: 'service-pane',
            template: "\n <aside class=\"service-pane open\">\n            <div class=\"service-pane__wrap service-pane--close\">\n                <h3 class=\"service-pane__title\"><span class=\"left-right-slider\"></span>Services</h3>\n                <ul class=\"service-list\">\n                    <li class=\"service-list__item\" *ngFor=\"let service of services$\">\n                        <div class=\"service-status \" ng-class=\"{'service__not-running':service.Color == 'Gray','service__started-and-running':service.Color == 'LightGreen','service__started-not-running':service.Color == 'Green',\n                                    'service__take-long-time':service.Color == 'Orange','service__take-very-long-time':service.Color == 'Red'}\">\n                            <span class=\"service__buble\"></span>\n                        </div>\n                        <div class=\"service__detail\">\n                            <span>{{service.Name}}</span>\n                            <span>{{service.Description}}</span>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </aside>\n  ",
            providers: [status_monitor_service_1.StatusService]
        }), 
        __metadata('design:paramtypes', [status_monitor_service_1.StatusService])
    ], ServicePaneComponent);
    return ServicePaneComponent;
}());
exports.ServicePaneComponent = ServicePaneComponent;
//# sourceMappingURL=service-pane.component.js.map