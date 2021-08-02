"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routing = void 0;
var router_1 = require("@angular/router");
var notFound_component_1 = require("./pages/main/notFound.component");
var routes = [
    { path: "", loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/pages.module'); }).then(function (m) { return m.PagesModule; }); },
    },
    { path: '**', component: notFound_component_1.NotFoundComponent, redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(routes);
