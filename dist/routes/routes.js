"use strict";
var router_1 = require('@angular/router');
var status_monitor_routes_1 = require('../status-monitor/status-monitor.routes');
var login_routes_1 = require('../login/login.routes');
var interfaces_1 = require('../interfaces');
exports.routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}].concat(login_routes_1.loginRoutes, status_monitor_routes_1.statusMonitorRoutes);
exports.appRouterProviders = [
    router_1.provideRouter(exports.routes),
    login_routes_1.authProviders,
    interfaces_1.CanDeactivateGuard
];
//# sourceMappingURL=routes.js.map