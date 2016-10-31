Angular v1.5
============

Angular is a well-established framework for building javascript applications.
There is plenty of material online if you want to learn more.
Some good links are:
+ <https://docs.angularjs.org> - Angular's official website and documentation for v1.5
+ John Papa's [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
  + This guide has a lot of good conventions for writing angular code, and lots of examples.
  I prefer these examples to the ones on angular's website.
+ <https://github.com/angular/angular.js> - Angular v1 source code on gitub.

### Modules
In angular a module is a grouping of features.
You create a module with `angular.module('moduleName', moduleDependencies)`.
You add a feature to a module with `angular.module('moduleName').feature(...).
Every feature must belong to a module, and the module must be created before you can add a feature to it.

Below I will describe some of the features you can create in angular.

### Components
Components are new to angular v1.5. They are a convenient way to extend the HTML DOM with new elements.
For example it would be really convenient to have an element that provides a list of cases in a table.
So we create a component for this:
``` javascript
angular.module('cases').component('caseList', {
  bindings: {
    cases: '=',
    showEmail: '<'
  },
  controller: CaseListControler,
  templateUrl: 'path/to/my/template.html'
  ...
});
```

And we use it in our webpage like this:
```HTML
<div class="my-cases">
  <case-list cases="$ctrl.myCases" show-email="false"></case-list>
</div>
```

Components also have controllers where we can put our javascript:
```javascript
/* @NgInject */
function CaseListController(caseService) {
  var ctrl = this;
  ctrl.$onInit = function(){
    // perform component initialization here
  };

  ctrl.myMethod = function(){
    // you can call me from the component's template HTML
    caseService.someMethod();
  };
}
```

### Services
Services are singleton objects that can be injected into other features.
In the component example we injected the service called caseService into out component controller.
Services are created with the following syntax:
```javascript
angular.module('cases').service('caseService',CaseService);

/* @NgInject */
function CaseService($q) {
  var svc = this;

  svc.someMethod = function(){
    // do logic here
  };
}
```

Since a service is a singleton object, there is only one instance of it that is passed to all features.
This means that if one controller changes the state of the service, other controllers will also see that state change.

If you want the ability to create new instances of an object you will need to use a different feature called a Factory.

### Factories
Factories are very similar to services with only a small difference in how they are declared.
However factories are intended to serve a different use case: they allow you to create new instances of objects. At least that's how they are used in this project.
You can create a new factory with the following syntax:
```javascript
angular.module('cases').factory('Case',CaseFactory);

/* @NgInject */
function CaseFactory($q) {
  function Case(data) {
    // constructor for a new case object.
  }
  Case.prototype.newMethod = function(){
    // add method to Case prototype
  };
  return Case;
}
```
And you can use a factory like this:
```javascript
function NewCaseController(Case, caseService) {
  var ctrl = this;

  // create new case from form data
  ctrl.createCase = function(){
    ctrl.newCase = new Case(ctrl.data);
    ctrl.aValue = newCase.newMethod();
    caseService.createNewCase(ctrl.newCase);
    ...
  }
}
```

### Filters
Filters are designed to be used in HTML templates (although they can also be injected into a feature if needed).
We don't create many filters in the project, but we do use them a lot.
Here's an example of using the translate filter to transform a translation id into text:
```HTML
<label for="severity">{{ 'new_case.labels.severity' | translate }}</label>
...
```
The angle brackets are used to interpolate angular data into an HTML template. The filter is the portion after the pipe character.

There are many convenient filters built into angular and you can [learn more about them](https://docs.angularjs.org/api/ng/filter).

### Promises
Promises are not an angular component, but rather an emerging javascript standard for event chaining.
Angular uses a service called `$q` as its promise library.
I will explain the basic of promises with an example.
Let's suppose you have an angular service that makes a call out to a web service:
```js
/* @NgInject */
function CaseService($http){
  svc.getCase = function(caseId) {
    return $http.get('api/cases/:caseId', {caseId: caseId});
  };
}
```
Calling this service method will not wait until the HTTP response is returned, rather it will return immediately with a promise object.
A controller that calls this method can get the repsonse from this call like this:
```js
/* @NgInject */
function CaseDetailController(caseService, userNotificationService, $q) {
  caseService.getCase('12345')
    .then(function(response) {
      // do something with the response
      return anotherResponse;
    })
    .then(function(anotherResponse) {
      // see how we passed the response to this function?
      // this is called promise chaining
    })
    .then(function(){
      // you don't need to return a response to continue the chain
      // let's say somthing bad happens and we want to throw an exception.
      $q.reject('something bad happened');
    })
    .catch(function(error){
      // any rejected promises will end up here.
      userNotificationService.error('Oops!');
    });
}
```

You can create your own promises using the `$q` service:
```js
// $q.defer allows us greater control over when we resolve or reject a promise
function usingDeferred() {
  var deferred = $q.defer();
  doSomething().then(function(result){
    if (result.success) {
      deferred.resolve(result.data);
    } else {
      deferred.reject(result.error);
    }
  });
  return deferred.promise;
}
usingDeferred().then(handleSuccess).catch(handleError);

// $q.when allow us to transform an object into a promise
function usingWhen() {
  return $q.when(someObject);
}
usingWhen().then(function(someObject){...});

// $q.all allows us to resolve multiple promises simultaneously
function usingAll() {
  return $q.all([usingDeferred(), usingWhen()])
    .then(function(results) {
      var deferredResult = results[0];
      var whenResult = results[1];
    });
}
```