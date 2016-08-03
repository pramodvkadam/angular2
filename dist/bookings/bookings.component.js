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
var bookings_service_1 = require('./bookings.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var modal_component_1 = require('ng2-bootstrap/components/modal/modal.component');
var datatable_1 = require('angular2-datatable/datatable');
var Booking = (function () {
    function Booking(campingId, season) {
        this.campingId = campingId;
        this.season = season;
    }
    return Booking;
}());
exports.Booking = Booking;
var BookingsComponent = (function () {
    function BookingsComponent(_bookingService) {
        this._bookingService = _bookingService;
        this.correctionComments = [];
        this.bookingList = [];
        this.commissionPercentage = 20;
        this.status = { isopen: false };
        this.active = true;
        this.bookingFilter = new Booking(null, 2016);
        this.isCancellationCorrection = false;
        this.generalCorrectionData = [];
        this.newGeneralCorrection = [];
    }
    BookingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._bookingService.getCorrectionComments().then(function (comments) {
            _this.correctionComments = comments;
        });
    };
    BookingsComponent.prototype.getBookingList = function () {
        var _this = this;
        this._bookingService.getBookingList(this.bookingFilter.campingId, this.bookingFilter.season).then(function (data) {
            _this.bookingList = data;
            console.log(_this.bookingList);
        });
    };
    BookingsComponent.prototype.setDefaultOptionforCorrection = function (isCapsiteCorrection) {
        this.newGeneralCorrection.CampingId = this.bookingFilter.campingId;
        this.newGeneralCorrection.BookingId = this.generalCorrectionData.BookingId;
        this.newGeneralCorrection.BookingNumber = this.generalCorrectionData.BookingNumber;
        this.newGeneralCorrection.IsCampsiteCorrection = isCapsiteCorrection;
        this.newGeneralCorrection.CommissionPercentage = this.commissionPercentage;
        this.newGeneralCorrection.CommissionAmount = 0;
        this.newGeneralCorrection.PaymentAmount = 0;
        this.newGeneralCorrection.Description = "";
        this.newGeneralCorrection.IsCancellationCorrection = this.isCancellationCorrection;
        this.newGeneralCorrection.CorrectionCommentId = (this.isCancellationCorrection) ? 712340005 : 712340008;
    };
    BookingsComponent.prototype.getGeneralCorrectionDetail = function () {
        var _this = this;
        this.isCancellationCorrection = false;
        this._bookingService.getGeneralCorrectionDetail(this.bookingFilter.campingId, this.bookingFilter.season).then(function (generalCorrectionData) {
            _this.generalCorrectionData = generalCorrectionData;
            _this.setDefaultOptionforCorrection(true);
            _this.showChildModal();
        }, function (error) {
            alert(error.data.ExceptionMessage);
        });
    };
    BookingsComponent.prototype.calculateCorrection = function () {
        var calculationAmount = (this.isCancellationCorrection) ? this.newGeneralCorrection.CancellationAmount : this.newGeneralCorrection.GrossAmount;
        this.newGeneralCorrection.CommissionAmount = calculationAmount * this.newGeneralCorrection.CommissionPercentage / 100;
        this.newGeneralCorrection.NetCorrectionAmount = calculationAmount - this.newGeneralCorrection.CommissionAmount;
        this.calculatePaymentAmount();
    };
    BookingsComponent.prototype.calculatePaymentAmount = function () {
        this.newGeneralCorrection.PaymentAmount = this.newGeneralCorrection.NetCorrectionAmount;
        if (!this.isCancellationCorrection) {
            this.newGeneralCorrection.PaymentAmount -= (this.generalCorrectionData.ToBePaid + this.generalCorrectionData.AllReadyPayed);
        }
    };
    BookingsComponent.prototype.calculateOnNetCorrection = function () {
        var calculationAmount = (this.isCancellationCorrection) ? this.newGeneralCorrection.CancellationAmount : this.newGeneralCorrection.GrossAmount;
        calculationAmount = this.newGeneralCorrection.NetCorrectionAmount / ((100 - this.newGeneralCorrection.CommissionPercentage) / 100);
        this.newGeneralCorrection.CommissionAmount = calculationAmount - this.newGeneralCorrection.NetCorrectionAmount;
        if (this.isCancellationCorrection) {
            this.newGeneralCorrection.CancellationAmount = calculationAmount;
        }
        else {
            this.newGeneralCorrection.GrossAmount = calculationAmount;
        }
        this.calculatePaymentAmount();
    };
    ;
    BookingsComponent.prototype.bookingByBookingId = function (bookingId, cancellationCorrection) {
        var _this = this;
        this.isCancellationCorrection = cancellationCorrection;
        this._bookingService.getBookingDetailsById(bookingId).then(function (generalCorrectionData) {
            _this.generalCorrectionData = generalCorrectionData;
            _this.setDefaultOptionforCorrection(false);
            _this.showChildModal();
        }, function (error) {
            alert(error.data.ExceptionMessage);
        });
    };
    ;
    BookingsComponent.prototype.createCorrection = function () {
        var _this = this;
        /*this.newGeneralCorrection*/ ;
        this.newGeneralCorrection.CommissionAmount = -Math.abs(this.newGeneralCorrection.CommissionAmount);
        if (!this.isCancellationCorrection) {
            this.newGeneralCorrection.CommissionAmount = -Math.abs(Math.abs(this.newGeneralCorrection.CommissionAmount) - Math.abs(this.generalCorrectionData.CommissionAmount));
        }
        this.newGeneralCorrection.GrossAmount = this.newGeneralCorrection.GrossAmount - this.generalCorrectionData.GrossAmount;
        this.newGeneralCorrection.CorrectionCommentId = this.newGeneralCorrection.CorrectionCommentId;
        this.newGeneralCorrection.Description = this.newGeneralCorrection.Description;
        this._bookingService.saveCorrection(this.newGeneralCorrection).then(function (response) {
            console.log(response);
            _this.hideChildModal();
            alert("Correction created successfully");
        }, function (error) {
            alert(error.data.ExceptionMessage);
        });
    };
    BookingsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    BookingsComponent.prototype.hideChildModal = function () {
        this.generalCorrectionData = [];
        this.newGeneralCorrection = [];
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', modal_component_1.ModalDirective)
    ], BookingsComponent.prototype, "childModal", void 0);
    BookingsComponent = __decorate([
        core_1.Component({
            selector: 'bookings',
            templateUrl: 'app/bookings/booking.html',
            providers: [bookings_service_1.BookingService, common_1.DatePipe],
            directives: [datatable_1.DataTableDirectives, ng2_bootstrap_1.MODAL_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [bookings_service_1.BookingService])
    ], BookingsComponent);
    return BookingsComponent;
}());
exports.BookingsComponent = BookingsComponent;
//# sourceMappingURL=bookings.component.js.map