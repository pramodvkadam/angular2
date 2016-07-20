import { provideRouter, RouterConfig }  from '@angular/router';

import {statusMonitorRoutes} from '../status-monitor/status-monitor.routes';
import {statementRoutes} from '../statement/statement.routes';
import {searchRoutes} from '../search/search.routes';


import { loginRoutes,
         authProviders }      from '../login/login.routes';

import { CanDeactivateGuard } from '../interfaces';

export const routes: RouterConfig = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  ...loginRoutes,
  ...statusMonitorRoutes,
  ...statementRoutes,
  ...searchRoutes
];

export const appRouterProviders = [
  provideRouter(routes),
  authProviders,
  CanDeactivateGuard
];
