import { RouterConfig }          from '@angular/router';
import { SearchComponent } from './search.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../auth.guard';

export const searchRoutes: RouterConfig = [
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  }
];
