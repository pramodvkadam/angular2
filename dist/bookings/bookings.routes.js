"use strict";
var bookings_component_1 = require('./bookings.component');
var auth_guard_1 = require('../auth.guard');
exports.bookingsRoutes = [
    {
        path: 'bookings',
        component: bookings_component_1.BookingsComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
//# sourceMappingURL=bookings.routes.js.map