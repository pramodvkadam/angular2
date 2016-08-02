import { RouterConfig }          from '@angular/router';
import { BookingsComponent } from './bookings.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../auth.guard';

export const bookingsRoutes: RouterConfig = [
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [AuthGuard]
  }
];
