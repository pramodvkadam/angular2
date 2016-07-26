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
var notifications_service_1 = require('./notifications.service');
var NotificationComponent = (function () {
    function NotificationComponent(_notificationService) {
        this._notificationService = _notificationService;
        this._maxSize = 1000;
        this._lastRecord = 0;
    }
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._notificationService.getAllNotifications(this._maxSize, this._lastRecord)
            .then(function (notification) {
            _this.notifications$ = notification;
            console.log(_this.notifications$);
        });
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'notifications',
            template: "\n<div class=\"message-panel__wrap  col-xs-12 col-sm-6\"  >\n    <h3>Notification</h3>\n<div class=\"message__item\">\n        <p *ngFor=\"let log of notifications$\"  >\n            {{log.Message}}\n</p>\n    </div> \n</div>\n  ",
            providers: [notifications_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationService])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notifications.component.js.map