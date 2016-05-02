angular.module('cases')

.component('caseDetail', {
    templateUrl: 'cases/detail/caseDetail.tpl.html',
    bindings: {
        $router: '<'
    },
    controller: CaseDetailComponent
});

function CaseDetailComponent(caseService, dialogService) {
    var ctrl = this;
    this.$routerOnActivate = function(next) {
        // Get the case identified by the route parameter
        var id = next.params.id;
        caseService.getCase(id).then(function(foundCase) {
            if (foundCase) {
                ctrl.editName = foundCase.name;
                ctrl.case = foundCase;
            } else { // id not found
                ctrl.gotoCases();
            }
        });
    };

    this.$routerCanDeactivate = function() {
        // Allow synchronous navigation (`true`) if no case or the case is unchanged.
        if (!this.case || this.case.name === this.editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return dialogService.confirm('Discard changes?');
    };

    this.cancel = function() {
        ctrl.editName = ctrl.case.name;
        ctrl.goBack();
    };

    this.save = function() {
        ctrl.case.name = ctrl.editName;
        ctrl.goBack();
    };

    this.goBack = function() {
        window.history.back();
    };

    this.gotoCases = function() {
        var caseId = ctrl.case && ctrl.case.id;
        // Pass along the hero id if available
        // so that the CaseListComponent can select that hero.
        this.$router.navigate(['CaseList', {
            id: caseId
        }]);
    };
}