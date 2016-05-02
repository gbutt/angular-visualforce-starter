angular.module('cases')
    .service('caseService', CaseService)

function CaseService($q) {
    var caseList = [{
        id: 1,
        name: 'Can\'t login'
    }, {
        id: 2,
        name: 'Browser crashes'
    }, {
        id: 3,
        name: 'Need help installing an update'
    }, {
        id: 4,
        name: 'Export data'
    }];
    var nextId = 5;
    var casesPromise = $q.when(caseList);

    this.getCases = function() {
        return casesPromise;
    };

    this.getCase = function(id) {
        return casesPromise.then(function(cases) {
            for (var i = 0; i < cases.length; i++) {
                if (cases[i].id == id) return cases[i];
            }
        });
    };

    this.createCase = function(newCase) {
        newCase.id = nextId++;
        caseList.push(newCase);
        return $q.when(newCase);
    };

    this.findCases = function(params) {
        var searchResults = caseList.filter(function(aCase) {
            return aCase.name.indexOf(params.name) > -1;
        });
        return $q.when(searchResults);
    }
}