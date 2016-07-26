"use strict";
var status_monitor_component_1 = require('./status-monitor.component');
var auth_guard_1 = require('../auth.guard');
exports.statusMonitorRoutes = [
    {
        path: 'status-monitor',
        component: status_monitor_component_1.StatusMonitorComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
//# sourceMappingURL=status-monitor.routes.js.map