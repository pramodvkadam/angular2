import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {HeaderComponent} from './common/header.component';

import {FooterComponent} from './common/footer.component';

@Component({
  selector: 'cgp-app',
  template: `<div class="container-fluid">
 <header-component></header-component>
  <router-outlet></router-outlet>
<footer-component></footer-component>
<div class="container-fluid">
`,
  directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent]
})
export class AppComponent {
    public constructor(public viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
