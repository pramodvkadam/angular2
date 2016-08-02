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
        this.statementApprove = function (increment) {
            var _this = this;
            if (increment === void 0) { increment = 0; }
            if (this.paymentData[increment].Approve) {
                this.setDefaultOptionsForApprove();
                this.approveStatementObject.AccountId = this.paymentData[increment].AccountId;
                this.approveStatementObject.CampsiteId = this.paymentData[increment].CampsiteId;
                this.approveStatementObject.MailToAccount = this.paymentData[increment].SendMail;
                this.approveStatementObject.MailSendToAccount = this.paymentData[increment].SendMail;
                this.approveStatementObject.InvoiceOnPdf = this.paymentData[increment].CreateInvoice;
                this.approveStatementObject.AccountLocationId = this.paymentData[increment].AccountLocationId;
                this.overlay = true;
                this._statementService.approveStatement(this.approveStatementObject).then(function (response) {
                    _this.paymentData[increment]['is_success'] = response;
                    if (response) {
                        _this.paymentData[increment].Approve = false;
                    }
                    _this.overlay = false;
                    _this.proccessedCount++;
                    if (++increment < _this.paymentData.length) {
                        setTimeout(_this.statementApprove(increment), 1000);
                    }
                }).catch(function (error) {
                    _this.paymentData[increment]['is_success'] = false;
                    if (++increment < _this.paymentData.length) {
                        setTimeout(_this.statementApprove(increment), 1000);
                    }
                    _this.overlay = false;
                });
            }
            else {
                if (++increment < this.paymentData.length) {
                    this.statementApprove(increment);
                }
            }
        };
        this.filter = new statement_1.Statement(2016, null, null, new Date(), new Date(), null, new Date());
        this.active = true;
        this.fromDatePicker = false;
        this.toDatePicker = false;
        this.statementDatePicker = false;
        this.overlay = false;
        this.previewStatementObject = new statement_1.statementOptions();
        this.approveStatementObject = new statement_1.statementOptions();
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
            _this.setDefaultOptionsForPreview();
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
    StatementComponent.prototype.toggleToDatepicker = function () {
        this.toDatePicker = !this.toDatePicker;
        this.fromDatePicker = false;
        this.statementDatePicker = false;
    };
    StatementComponent.prototype.toggleFromDatepicker = function () {
        this.fromDatePicker = !this.fromDatePicker;
        this.toDatePicker = false;
        this.statementDatePicker = false;
    };
    StatementComponent.prototype.toggleStatementDatepicker = function () {
        this.statementDatePicker = !this.statementDatePicker;
        this.fromDatePicker = false;
        this.toDatePicker = false;
    };
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
    StatementComponent.prototype.setDefaultOptionsForPreview = function () {
        this.previewStatementObject.BookingPaymentType = this.filter.PaymentType;
        this.previewStatementObject.BookingSeason = this.filter.Season;
        this.previewStatementObject.StartDate = this.filter.FromDate;
        this.previewStatementObject.EndDate = this.filter.ToDate;
        this.previewStatementObject.StatementDate = this.filter.statementDate;
    };
    ;
    StatementComponent.prototype.setDefaultOptionsForApprove = function () {
        this.approveStatementObject.BookingPaymentType = this.filter.PaymentType;
        this.approveStatementObject.BookingSeason = this.filter.Season;
        this.approveStatementObject.StartDate = this.filter.FromDate;
        this.approveStatementObject.EndDate = this.filter.ToDate;
        this.approveStatementObject.StatementDate = this.filter.statementDate;
        this.approveStatementObject.StatementNumber = 1;
    };
    ;
    StatementComponent.prototype.getStatementPreview = function (statementRow) {
        this.setDefaultOptionsForPreview();
        this.previewStatementObject.CampsiteId = statementRow.CampsiteId;
        this.previewStatementObject.AccountId = statementRow.AccountId;
        this.previewStatementObject.InvoiceOnPdf = statementRow.CreateInvoice;
        this.previewStatementObject.AccountLocationId = statementRow.AccountLocationId;
        this._statementService.getStatementPreview(this.previewStatementObject).then(function (response) {
            console.log(response);
        }, function (error) { return console.log(error); });
    };
    StatementComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/statement/statement.html',
            providers: [statement_service_1.StatementService, common_1.DatePipe],
            directives: [datatable_1.DataTableDirectives, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES],
            styles: ["\n    .popup {\n      position: absolute;\n    z-index:1000;\n      background-color: #fff;\n      border-radius: 3px;\n      border: 1px solid #ddd;\n      height: 251px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [statement_service_1.StatementService, common_1.DatePipe])
    ], StatementComponent);
    return StatementComponent;
}());
exports.StatementComponent = StatementComponent;
//# sourceMappingURL=statement.component.js.map