angular.module('cases')

.component('caseNew', {
    templateUrl: 'cases/new/caseNew.tpl.html',
    bindings: {
        $router: '<'
    },
    controller: CaseNewComponent
});

function CaseNewComponent(caseService, dialogService, $rootRouter) {
    var ctrl = this;

    this.$routerOnActivate = function(next) {
        ctrl.case = {};
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
        ctrl.gotoCases();
    };

    this.save = function() {
        ctrl.case.name = ctrl.editName;
        caseService.createCase(ctrl.case);
        ctrl.gotoCases();
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