import { RouterConfig }          from '@angular/router';
import { StatementComponent } from './statement.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../auth.guard';

export const statementRoutes: RouterConfig = [
  {
    path: 'statement',
    component: StatementComponent,
    canActivate: [AuthGuard]
  }
];
