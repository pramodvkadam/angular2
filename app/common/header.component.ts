import { Component }    from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
    selector : 'header-component',
    templateUrl: 'app/common/views/header.html',
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES],
})
export class HeaderComponent {
    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };
    public items: Array<string> = ['The first choice!',
        'And another choice for you.', 'but wait! A third!'];

    public userName: string = "";

    constructor() {
        var user = JSON.parse(localStorage.getItem("acsi_b2b_user"));
        if (user) {
            this.userName = user.userName;
        }
    }
}
