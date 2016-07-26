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
var common_1 = require('@angular/common');
var statement_1 = require('./statement');
var statement_service_1 = require('./statement.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var datatable_1 = require('angular2-datatable/datatable');
var StatementComponent = (function () {
    function StatementComponent(_statementService, datePipe) {
        this._statementService = _statementService;
        this.datePipe = datePipe;
        this.submitted = false;
        this.minDate = void 0;
        this.paymentData = [];
        this.filter = new statement_1.Statement(2016, null, null, new Date(), new Date(), null);
        this.active = true;
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    }
    StatementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._statementService.getPaymentTypes()
            .then(function (payementTypes) {
            _this.paymentType = payementTypes;
        });
    };
    StatementComponent.prototype.onSubmit = function () {
        var _this = this;
        var filter = this.filter;
        this.paymentData = [];
        filter.FromDate = this.datePipe.transform(filter.FromDate, 'yyyy-MM-dd');
        filter.ToDate = this.datePipe.transform(filter.ToDate, 'yyyy-MM-dd');
        this._statementService.getPaymentSummery(this.filter).then(function (summary) {
            _this.paymentData = summary;
            _this.checkAllApproved("Approve");
            _this.checkAllApproved("SendMail");
            _this.checkAllApproved("CreateInvoice");
            //this.length = this.paymentData.length;
            //this.onChangeTable(this.config);
        });
    };
    StatementComponent.prototype.setAll = function (attrValue, attrKey) {
        //this.disableApproved = false;
        this.selectedStatementCount = 0;
        this.proccessedCount = 0;
        for (var _i = 0, _a = this.paymentData; _i < _a.length; _i++) {
            var value = _a[_i];
            if (!value.is_success) {
                value[attrKey] = attrValue;
                if (value.Approve) {
                    this.selectedStatementCount++;
                }
            }
        }
        ;
    };
    ;
    StatementComponent.prototype.checkAllApproved = function (attrKey) {
        var checked = this.paymentData.some(function (payment) {
            return payment[attrKey] === false;
        });
        switch (attrKey) {
            case "Approve":
                this.allApproved = checked;
                this.selectedStatementCount = 0;
                this.proccessedCount = 0;
                for (var _i = 0, _a = this.paymentData; _i < _a.length; _i++) {
                    var value = _a[_i];
                    if (value.Approve) {
                        this.selectedStatementCount++;
                    }
                }
                ;
                break;
            case "SendMail":
                this.allMail = checked;
                break;
            case "CreateInvoice":
                this.allInvoice = checked;
                break;
        }
    };
    ;
    StatementComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/statement/statement.html',
            providers: [statement_service_1.StatementService, common_1.DatePipe],
            directives: [datatable_1.DataTableDirectives, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [statement_service_1.StatementService, common_1.DatePipe])
    ], StatementComponent);
    return StatementComponent;
}());
exports.StatementComponent = StatementComponent;
//# sourceMappingURL=statement.component.js.map