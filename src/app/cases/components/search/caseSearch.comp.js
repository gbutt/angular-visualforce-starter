angular.module('cases')

.component('caseSearch', {
    templateUrl: 'cases/search/caseSearch.tpl.html',
    bindings: {
        $router: '<'
    },
    controller: CaseSearchComponent,
});

function CaseSearchComponent() {
    var ctrl = this;

    this.$routerOnActivate = function(next) {
        ctrl.searchParams = {};
    };

    this.search = function() {
        this.$router.navigate(['CaseSearchResults', ctrl.searchParams]);
    }

    this.cancel = function() {
        this.$router.navigate(['CaseList']);
    }
}