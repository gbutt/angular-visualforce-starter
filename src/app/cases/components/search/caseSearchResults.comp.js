angular.module('cases')

.component('caseSearchResults', {
    templateUrl: 'cases/search/caseSearchResults.tpl.html',
    bindings: {
        $router: '<'
    },
    controller: CaseSearchResultsComponent,
});

function CaseSearchResultsComponent(caseService) {
    var ctrl = this;

    this.$routerOnActivate = function(next) {
        // console.log(next.params);
        caseService.findCases(next.params)
            .then(function(cases) {
                ctrl.cases = cases;
            });
    };

    this.onSelect = function(selectedCase) {
        this.$router.navigate(['CaseDetail', {
            id: selectedCase.id
        }]);
    };
}