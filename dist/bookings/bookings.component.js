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
        }, function (error) {
            alert(error.data.ExceptionMessage);
        });
    };
    BookingsComponent = __decorate([
        core_1.Component({
            selector: 'bookings',
            templateUrl: 'app/bookings/booking.html',
            providers: [bookings_service_1.BookingService, common_1.DatePipe],
            directives: [datatable_1.DataTableDirectives, ng2_bootstrap_1.MODAL_DIRECTIVES],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [bookings_service_1.BookingService])
    ], BookingsComponent);
    return BookingsComponent;
}());
exports.BookingsComponent = BookingsComponent;
//# sourceMappingURL=bookings.component.js.map