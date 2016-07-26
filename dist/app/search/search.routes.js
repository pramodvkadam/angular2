"use strict";
var search_component_1 = require('./search.component');
var auth_guard_1 = require('../auth.guard');
exports.searchRoutes = [
    {
        path: 'search',
        component: search_component_1.SearchComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
//# sourceMappingURL=search.routes.js.map