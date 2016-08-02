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
var datepicker_1 = require('ng2-bootstrap/components/datepicker');
var AcsiDatepickerComponent = (function () {
    function AcsiDatepickerComponent() {
        this.dateModelChange = new core_1.EventEmitter();
        this.showDatepicker = false;
    }
    AcsiDatepickerComponent.prototype.showPopup = function () {
        this.showDatepicker = true;
    };
    AcsiDatepickerComponent.prototype.hidePopup = function (event) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], AcsiDatepickerComponent.prototype, "dateModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AcsiDatepickerComponent.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AcsiDatepickerComponent.prototype, "dateModelChange", void 0);
    AcsiDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'date-picker',
            directives: [datepicker_1.DATEPICKER_DIRECTIVES],
            template: "\n      <label>{{label}}</label>\n      <input [(ngModel)]=\"dateModel\" class=\"form-control\"     (focus)=\"showPopup()\" />\n      <datepicker class=\"popup\" *ngIf=\"showDatepicker\" [(ngModel)]=\"dateModel\" showWeeks=\"true\" (ngModelChange)=\"hidePopup($event)\" ></datepicker>\n  ",
            styles: ["\n    .popup {\n      position: absolute;\n      background-color: #fff;\n      border-radius: 3px;\n      border: 1px solid #ddd;\n      height: 251px;\n    }\n  "],
        }), 
        __metadata('design:paramtypes', [])
    ], AcsiDatepickerComponent);
    return AcsiDatepickerComponent;
}());
exports.AcsiDatepickerComponent = AcsiDatepickerComponent;
//# sourceMappingURL=date-picker.js.map