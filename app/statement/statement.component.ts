import { Component, OnInit }    from '@angular/core';
import { NgForm }    from '@angular/forms';
import { FORM_DIRECTIVES,DatePipe} from '@angular/common';
import {Statement} from './statement';
import {StatementService} from './statement.service';
import {DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {DataTableDirectives} from 'angular2-datatable/datatable';


@Component({

    templateUrl: 'app/statement/statement.html',
    providers: [StatementService, DatePipe],
    directives: [DataTableDirectives, DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES]
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

    public minDate: Date = void 0;
    private paymentData:Array<any> = [];


    constructor(private _statementService: StatementService, private datePipe: DatePipe) {
        this.filter = new Statement(2016, null, null, new Date(), new Date(), null);
        this.active = true;
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

}
