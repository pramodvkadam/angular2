import { Component, OnInit }    from '@angular/core';
import { NgForm }    from '@angular/forms';
import { FORM_DIRECTIVES, DatePipe} from '@angular/common';
import { BookingList, Correction,BookingService} from './bookings.service';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {DataTableDirectives} from 'angular2-datatable/datatable';

export class Booking {
    constructor(
        public campingId: number,
        public season: number
    ) { }
}

@Component({
    selector: 'bookings',
    templateUrl: 'app/bookings/booking.html',
    providers: [BookingService, DatePipe],
    directives: [DataTableDirectives,  MODAL_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS],
  })
export class BookingsComponent implements OnInit {

    bookingFilter: Booking;
    correctionComments: Array<any> = [];
    public bookingList: Array<BookingList> = [];
    private isCancellationCorrection: boolean;
    public generalCorrectionData: any;
    active: boolean;
    private commissionPercentage: number = 20;
    public newGeneralCorrection: any;

    constructor(private _bookingService: BookingService) {
        this.active = true;
        this.bookingFilter = new Booking(null, 2016);
        this.isCancellationCorrection = false;
        this.generalCorrectionData = [];
        this.newGeneralCorrection = [];
    }

    ngOnInit() {
        this._bookingService.getCorrectionComments().then(comments => {
            this.correctionComments = comments;
        });
    }

    getBookingList() {
        this._bookingService.getBookingList(this.bookingFilter.campingId, this.bookingFilter.season).then(data => {
            this.bookingList = data;
            console.log(this.bookingList);
        })
    }

    setDefaultOptionforCorrection(isCapsiteCorrection: boolean) {
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

    }

    getGeneralCorrectionDetail() {
        this.isCancellationCorrection = false;
        this._bookingService.getGeneralCorrectionDetail(this.bookingFilter.campingId, this.bookingFilter.season).then(generalCorrectionData => {
            this.generalCorrectionData = generalCorrectionData;
            this.setDefaultOptionforCorrection(true);
        },error => {
            alert(error.data.ExceptionMessage);
        });
    }
  

}
