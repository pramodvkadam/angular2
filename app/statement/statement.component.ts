import { Component, OnInit }    from '@angular/core';
import { NgForm }    from '@angular/forms';
import {CORE_DIRECTIVES, DatePipe} from '@angular/common';
import {Statement} from './statement';
import {StatementService} from './statement.service';
import * as moment from 'moment';
import {DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {DataTable, Column} from 'primeng/primeng';


@Component({

    templateUrl: 'app/statement/statement.html',
    providers: [StatementService, DatePipe],
    directives: [DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES,  CORE_DIRECTIVES]
})
export class StatementComponent implements OnInit {

    filter: Statement;
    paymentType: any;
    submitted: boolean = false;
    active: boolean;

    public minDate: Date = void 0;
    private paymentData:Array<any> = [];
    paymentDataRows: Array<any> = [];
    public paymentDataColumns: Array<any> = [
        { title: 'Name', name: 'name' },
        { title: 'Position', name: 'position', sort: false },
        { title: 'Office', name: 'office', sort: 'asc' },
        { title: 'Extn.', name: 'ext', sort: '' },
        { title: 'Start date', name: 'startDate' },
        { title: 'Salary ($)', name: 'salary' }
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.paymentDataColumns }
    };


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
            //this.length = this.paymentData.length;
            //this.onChangeTable(this.config);
        });
    }


    public changePage(page: any, data: Array<any> = this.paymentData): Array<any> {
        console.log(page);
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '') {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        if (!config.filtering) {
            return data;
        }

        let filteredData: Array<any> = data.filter((item: any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));

        return filteredData;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.paymentData, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.paymentDataRows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
}
