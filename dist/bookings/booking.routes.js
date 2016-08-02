"use strict";
var statement_component_1 = require('./statement.component');
var auth_guard_1 = require('../auth.guard');
exports.statementRoutes = [
    {
        path: 'statement',
        component: statement_component_1.StatementComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
//# sourceMappingURL=booking.routes.js.map