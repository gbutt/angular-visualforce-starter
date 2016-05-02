angular.module('cases')

.component('caseList', {
    templateUrl: 'cases/list/caseList.tpl.html',
    bindings: {
        $router: '<'
    },
    controller: CaseListComponent,
});

function CaseListComponent(caseService) {
    var selectedId = null;
    var ctrl = this;

    this.$routerOnActivate = function(next) {
        // Load up the crises for this view
        caseService.getCases().then(function(cases) {
            ctrl.cases = cases;
            selectedId = next.params.id;
        });
    };

    this.isSelected = function(selectedCase) {
        return (selectedCase.id == selectedId);
    };

    this.onSelect = function(selectedCase) {
        this.$router.navigate(['CaseDetail', {
            id: selectedCase.id
        }]);
    };
}