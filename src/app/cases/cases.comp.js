angular.module('cases', ['dialog'])
    .component('cases', {
        templateUrl: 'cases/cases.tpl.html',
        $routeConfig: [{
            path: '/',
            name: 'CaseList',
            component: 'caseList',
            useAsDefault: true
        }, {
            path: '/new',
            name: 'CaseNew',
            component: 'caseNew'
        }, {
            path: '/search',
            name: 'CaseSearch',
            component: 'caseSearch'
        }, {
            path: '/searchResult',
            name: 'CaseSearchResults',
            component: 'caseSearchResults'
        }, {
            path: '/:id',
            name: 'CaseDetail',
            component: 'caseDetail'
        }]
    })