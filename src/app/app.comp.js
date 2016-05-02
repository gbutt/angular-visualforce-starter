angular.module('app', ['ngComponentRouter', 'templates', 'cases'])

.value('$routerRootComponent', 'app')

.component('app', {
    templateUrl: 'app.tpl.html',
    $routeConfig: [{
        path: '/cases/...',
        name: 'Cases',
        component: 'cases',
        useAsDefault: true
    }]
});