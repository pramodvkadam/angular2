import { Component, OnInit, ViewChild}    from '@angular/core';
import { NgForm }    from '@angular/forms';
import { FORM_DIRECTIVES, DatePipe} from '@angular/common';
import { BookingList, Correction,BookingService} from './bookings.service';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ModalDirective} from 'ng2-bootstrap/components/modal/modal.component';
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
    directives: [DataTableDirectives, MODAL_DIRECTIVES, DROPDOWN_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS],
  })
export class BookingsComponent implements OnInit {

    @ViewChild('childModal') public childModal: ModalDirective;

    bookingFilter: Booking;
    correctionComments: Array<any> = [];
    public bookingList: Array<BookingList> = [];
    private isCancellationCorrection: boolean;
    public generalCorrectionData: any;
    active: boolean;
    private commissionPercentage: number = 20;
    public newGeneralCorrection: any;
    public status: { isopen: boolean } = { isopen: false };

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
            this.showChildModal();
        },error => {
            alert(error.data.ExceptionMessage);
        });
    }

    calculateCorrection() {
        var calculationAmount = (this.isCancellationCorrection) ? this.newGeneralCorrection.CancellationAmount : this.newGeneralCorrection.GrossAmount;
        this.newGeneralCorrection.CommissionAmount = calculationAmount * this.newGeneralCorrection.CommissionPercentage / 100;
        this.newGeneralCorrection.NetCorrectionAmount = calculationAmount - this.newGeneralCorrection.CommissionAmount;
       this.calculatePaymentAmount();
    }

    calculatePaymentAmount() {
        this.newGeneralCorrection.PaymentAmount = this.newGeneralCorrection.NetCorrectionAmount;
        if (!this.isCancellationCorrection) {
            this.newGeneralCorrection.PaymentAmount -= (this.generalCorrectionData.ToBePaid + this.generalCorrectionData.AllReadyPayed);
        }
    }

    calculateOnNetCorrection() {
        var calculationAmount = (this.isCancellationCorrection) ? this.newGeneralCorrection.CancellationAmount : this.newGeneralCorrection.GrossAmount;
        calculationAmount = this.newGeneralCorrection.NetCorrectionAmount / ((100 - this.newGeneralCorrection.CommissionPercentage) / 100);
        this.newGeneralCorrection.CommissionAmount = calculationAmount - this.newGeneralCorrection.NetCorrectionAmount;
        if (this.isCancellationCorrection) {
            this.newGeneralCorrection.CancellationAmount = calculationAmount;
        } else {
            this.newGeneralCorrection.GrossAmount = calculationAmount;
        }
        this.calculatePaymentAmount();
    };

    bookingByBookingId(bookingId: number, cancellationCorrection: boolean) {
        this.isCancellationCorrection = cancellationCorrection;
        this._bookingService.getBookingDetailsById(bookingId).then(generalCorrectionData => {
            this.generalCorrectionData = generalCorrectionData;
            this.setDefaultOptionforCorrection(false);
            this.showChildModal();
        }, error => {
            alert(error.data.ExceptionMessage);
        });
    };

    createCorrection() {
       /*this.newGeneralCorrection*/;
       this.newGeneralCorrection.CommissionAmount = -Math.abs(this.newGeneralCorrection.CommissionAmount);
        if (!this.isCancellationCorrection) {
            this.newGeneralCorrection.CommissionAmount = -Math.abs(Math.abs(this.newGeneralCorrection.CommissionAmount) - Math.abs(this.generalCorrectionData.CommissionAmount));
        }
        this.newGeneralCorrection.GrossAmount = this.newGeneralCorrection.GrossAmount - this.generalCorrectionData.GrossAmount;
        this.newGeneralCorrection.CorrectionCommentId = this.newGeneralCorrection.CorrectionCommentId;
        this.newGeneralCorrection.Description = this.newGeneralCorrection.Description;

        this._bookingService.saveCorrection(this.newGeneralCorrection).then(response => {
            console.log(response);
            this.hideChildModal();
           alert("Correction created successfully");
        }, error => {
            alert(error.data.ExceptionMessage);
        });
    }


    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.generalCorrectionData = [];
        this.newGeneralCorrection = [];
        this.childModal.hide();
    }

}
