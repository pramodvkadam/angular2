import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/components/datepicker';

@Component({
    selector: 'date-picker',
    directives: [DATEPICKER_DIRECTIVES],
    template: `
      <label>{{label}}</label>
      <input [(ngModel)]="dateModel" class="form-control"     (focus)="showPopup()" />
      <datepicker class="popup" *ngIf="showDatepicker" [(ngModel)]="dateModel" showWeeks="true" (ngModelChange)="hidePopup($event)" ></datepicker>
  `,
    styles: [`
    .popup {
      position: absolute;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #ddd;
      height: 251px;
    }
  `],
})
export class AcsiDatepickerComponent {
    @Input()
    dateModel: Date;
    @Input()
    label: string;
    @Output()
    dateModelChange: EventEmitter<{}> = new EventEmitter();
    private showDatepicker: boolean = false;

    showPopup() {
        this.showDatepicker = true;
    }

    hidePopup(event) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event)
    }
}