import { Component, OnInit }    from '@angular/core';
import { NgForm }    from '@angular/forms';
import { FORM_DIRECTIVES,DatePipe} from '@angular/common';
import {Statement, statementOptions} from './statement';
import {StatementService} from './statement.service';
import {DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {AcsiDatepickerComponent} from '../common/date-picker'


@Component({
    templateUrl: 'app/statement/statement.html',
    providers: [StatementService, DatePipe],
    directives: [DataTableDirectives, DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES],
    styles: [`
    .popup {
      position: absolute;
    z-index:1000;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #ddd;
      height: 251px;
    }
  `]
})
export class StatementComponent implements OnInit {

    filter: Statement;
    paymentType: any;
    submitted: boolean = false;
    active: boolean;
    allApproved: boolean;
    allMail: boolean;
    allInvoice: boolean;
    selectedStatementCount: number;
    proccessedCount: number;
    fromDatePicker: boolean;
    toDatePicker: boolean;
    statementDatePicker: boolean;
    overlay: boolean;

    public minDate: Date = void 0;
    private paymentData: Array<any> = [];
    private previewStatementObject: statementOptions;
    private approveStatementObject: statementOptions;


    constructor(private _statementService: StatementService, private datePipe: DatePipe) {
        this.filter = new Statement(2016, null, null, new Date(), new Date(), null, new Date());
        this.active = true;
        this.fromDatePicker = false;
        this.toDatePicker = false;
        this.statementDatePicker = false;
        this.overlay = false;
        this.previewStatementObject = new statementOptions();
        this.approveStatementObject = new statementOptions();
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    }

    ngOnInit() {
        this._statementService.getPaymentTypes()
            .then(payementTypes => {
                this.paymentType = payementTypes;
            });
    }

    onSubmit() {
        var filter = this.filter;
        this.paymentData = [];
        filter.FromDate = this.datePipe.transform(filter.FromDate, 'yyyy-MM-dd');
        filter.ToDate = this.datePipe.transform(filter.ToDate, 'yyyy-MM-dd');
        this._statementService.getPaymentSummery(this.filter).then(summary => {
            this.paymentData = summary;
            this.checkAllApproved("Approve");
            this.checkAllApproved("SendMail");
            this.checkAllApproved("CreateInvoice");
            this.setDefaultOptionsForPreview();
            //this.length = this.paymentData.length;
            //this.onChangeTable(this.config);
        });
    }

    setAll(attrValue, attrKey) {
        //this.disableApproved = false;
        this.selectedStatementCount = 0;
        this.proccessedCount = 0;
        for (let value of this.paymentData) {
            if (!value.is_success) {
                value[attrKey] = attrValue;
                if (value.Approve) {
                    this.selectedStatementCount++;
                }
            }
        };
    };

    toggleToDatepicker() {
        this.toDatePicker = !this.toDatePicker;
        this.fromDatePicker = false;
        this.statementDatePicker = false;
    }

    toggleFromDatepicker() {
        this.fromDatePicker = !this.fromDatePicker;
        this.toDatePicker = false;
        this.statementDatePicker = false;
    }

    toggleStatementDatepicker() {
        this.statementDatePicker = !this.statementDatePicker;
        this.fromDatePicker = false;
        this.toDatePicker = false;
    }


    checkAllApproved(attrKey) {
        var checked = this.paymentData.some(function (payment) {
            return payment[attrKey] === false;
        });
        switch (attrKey) {
            case "Approve":
                this.allApproved = checked;
                this.selectedStatementCount = 0;
                this.proccessedCount = 0;
                for (let value of this.paymentData) {
                       if (value.Approve) {
                            this.selectedStatementCount++;
                        }
                };
                break;
            case "SendMail":
                this.allMail = checked;
                break;
            case "CreateInvoice":
                this.allInvoice = checked;
                break;
        }
    };

    setDefaultOptionsForPreview() {
        this.previewStatementObject.BookingPaymentType = this.filter.PaymentType;
        this.previewStatementObject.BookingSeason = this.filter.Season;
        this.previewStatementObject.StartDate = this.filter.FromDate;
        this.previewStatementObject.EndDate = this.filter.ToDate;
        this.previewStatementObject.StatementDate = this.filter.statementDate;
    };
    setDefaultOptionsForApprove() {
        this.approveStatementObject.BookingPaymentType = this.filter.PaymentType;
        this.approveStatementObject.BookingSeason = this.filter.Season;
        this.approveStatementObject.StartDate = this.filter.FromDate;
        this.approveStatementObject.EndDate = this.filter.ToDate;
        this.approveStatementObject.StatementDate = this.filter.statementDate
        this.approveStatementObject.StatementNumber = 1
    };

    getStatementPreview(statementRow) {
        this.previewStatementObject.CampsiteId = statementRow.CampsiteId;
        this.previewStatementObject.AccountId = statementRow.AccountId;
        this.previewStatementObject.InvoiceOnPdf = statementRow.CreateInvoice;
        this.previewStatementObject.AccountLocationId = statementRow.AccountLocationId;
    }

    statementApprove = function (increment: number = 0) {
        console.log(this.paymentData[increment].Approve);
        if (this.paymentData[increment].Approve) {
            this.previewStatementObject.AccountId = this.paymentData[increment].AccountId;
            this.previewStatementObject.CampsiteId = this.paymentData[increment].CampsiteId;
            this.previewStatementObject.MailToAccount = this.paymentData[increment].SendMail;
            this.previewStatementObject.MailSendToAccount = this.paymentData[increment].SendMail;
            this.previewStatementObject.InvoiceOnPdf = this.paymentData[increment].CreateInvoice;
            this.previewStatementObject.AccountLocationId = this.paymentData[increment].AccountLocationId;
            this.overlay= true;
            this._statementService.approveStatement(this.previewStatementObject).then(function (response) {
                console.log(response);
                this.paymentData[increment]['is_success'] = response;

                if (response) {
                    this.paymentData[increment].Approve = false;
                }
                this.overlay= false;
                this.proccessedCount++;
                if (++increment < this.paymentData.length) {
                    setTimeout(this.statementApprove(increment), 1000);
                }

            }).catch(function (response) {
                this.paymentData[increment]['is_success'] = false;
                this.overlay= false;
            });
        } else {
            if (++increment < this.paymentData.length) {
                this.statementApprove(increment);
            }
        }
    };

}
