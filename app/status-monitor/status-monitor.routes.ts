import { RouterConfig }          from '@angular/router';
import { StatusMonitorComponent } from './status-monitor.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../auth.guard';

export const statusMonitorRoutes: RouterConfig = [

  {
    path: 'status-monitor',
    component: StatusMonitorComponent,
	   canActivate: [AuthGuard]
  }
];
