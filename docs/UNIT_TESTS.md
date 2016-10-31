Unit Tests
==========
Unit testing is a must have for software development.
This is how we know our code works correctly, and it gives us the confidence to make changes without breaking expected functionality.
This solution uses the Karma test runner and [Jasmine](http://jasmine.github.io/2.0/introduction.html) framework for hosting and running unit tests.
It also uses Istanbul to calculate code coverage, which helps ensure the completeness of our tests.
All test files are located in the `src` directory next to the files they test.
Each test file ends in the extension `spec.js` and they share the name with the file they are testing.

### Running Unit Tests
+ Run all unit tests with the command `npm test`
  + This command will run all unit tests in the application.
  + It will also calculate code coverage an produce a report under the `coverage` directory.
+ There is a TDD mode that allows you to continuously run unit tests: `gulp tdd`
  + TDD mode will only execute unit tests in the spec file that changes.
  + All tests in the spec file will run everytime the spec file is saved.
  + This is a convenience that allows you to quickly write and validate your tests.
  + It also assures you that you are not breaking tests when you refactor code.


### Spec Files
The Jasmine framework organizes unit tests into `describe` blocks, `beforeEach` functions and `it` tests.
+ Each `describe` block contains a set of tests and any setup-teardown code related to those tests. Note that you can nest multiple `describe` blocks in a spec file.
+ The `beforeEach` block will setup test data before each test run.
+ The `it` block will perform the actual test assertions.

An example spec file for the file myComponent.js:

```js
// code under test in myComponent.js
module.exports = MyComponent;
function MyComponent(){
  var self = this;
  this.onInit = function(){
    if (!self.myId) {
      self.myId = '123';
    }
  };
}

// tests for my component in myComponent.spec.js
var MyComponent = require('./myComponent');
// describe block for the entire component
describe('my component', function(){
  // beforeEach block to create component. It is run before each test in this describe block.
  beforeEach(function(){
    this.component = new MyComponent();
  });
  // nested describe block for on init function
  describe('when on init', function(){
    // nested describe block for running on init without a value for myId
    describe('without value for myId', function(){
      // beforeEach block to setup data and run onInit function. It is run before each test in this describe block.
      beforeEach(function(){
        this.component.myId = undefined;
        this.component.onInit();
      });
      // it block to run assertions
      // this test has the name 'my component when on init without value for myId should default myId to 123'
      it('should default myId to 123', function(){
        expect(this.component.myId).toBe('123');
      });
    });
    // nested describe block for running on init with a value for myId
    describe('with value for myId', function(){
      beforeEach(function(){
        this.myId = '456';
        this.component.myId = this.myId;
        this.component.onInit();
      });
      it('should preserve myId', function(){
        expect(this.component.myId).toBe(this.myId);
      });
    });
  });
});
```


### Jasmine and `this`
`this` represents the binding context of a function.
In Jasmine, `this` is shared by all test blocks.
For example you can declare a property in a `beforeEach` block and use it in an `it` block.
This is useful for keeping your variables out of global scope when running tests.

```js
beforeEach(function(){
  this.myId = '123';
});
it('should change value for myId', function(){
  this.myId = '456';
  expect(this.myId).toBe('456');
});
it('should have a value for myId', function(){
  expect(this.myId).toBe('123');
});
```

If you declare a globally scoped variable in a test file, it will be available to all unit tests.
If one tests sets this variable to a value then all tests will use this new value.
Using `this` does not have this global scope limitation because variables declared on `this` are unique to each test.

```js
var myId = '123';
it('should change value for myId', function(){
  myId = '456';
  expect(myId).toBe('456');
});
it('should have a value for myId', function(){
  expect(myId).toBe('123'); // the value is changed to '456' from the previous test!
});
```


### Angular Unit Testing
Angular has special support for unit testing provided by the 'angular-mocks' library.
This library provides support for working with angular dependencies.

+ `angular.mock.module` provides a method to bootstrap our app in a manner that supports unit tests.
+ `inject` block provides a mechanism to inject angular services for use in our tests.
Inject must be called within a beforeEach block.
+ Promises will not resolve until we manually call `$scope.$apply()`.

```js
// create angular module and component in  myComponent.comp.js
angular.module('app', [])
  .service('myService', function(anotherService){
    this.doStuff = function(){
      myService.doMoreStuff()
        .then(function(result){
          self.result = result;
        });
    };
  });

// test component in myComponent.comp.spec.js
describe('my service', function(){
  beforeEach(function(){
    // bootstrap angular module
    angular.mock.module('app');
    // get references to angular dependencies
    inject(function($rootScope, $q, myService, anotherService){
      this.$q = $q;
      this.myService = myService;
      this.$rootScope = $rootScope;
    });
  });
  describe('do stuff', function(){
    beforeEach(function(){
      spyOn(this.anotherService, 'doMoreStuff').and.returnValue(this.$q.when('result'));
      this.myService.doStuff();
      // we need to call $scope.$apply() to resolve any pending promises.
      this.$rootScope.$apply();
    });
    it('should call another service to do more stuff', function(){
      expect(this.anotherService.doMoreStuff).toHaveBeenCalled();
    });
    it('should set result', function(){
      expect(this.myService.result).toBe('result');
    });
  })
});
```


### Spies
Spies in Jasmine allow us to wrap functions (or create them) and assert their interactions.
In our example we use a spy for the test `date range component on date change with delegate should call delegate`.
We setup a spy for the on change delegate function.
This allows us to assert the interaction with this function in our test.
In this test we assert that the delgate was called with specific values (fromDate and toDate).
Spies are powerful and widely used in unit tests.
You can read more about them in the [Jasmine](http://jasmine.github.io/2.0/introduction.html) documentation.

You can spy on existing functions with the following syntax:

```js
spyOn(this.myObject, 'functionCallToSpy');
```

This will create a spy on the function 'functionCallToSpy'.
It will also stub out this function so it does not perform any operations or return any data.
If you want to preserve the behavior of the spied function then use the following syntax:

```js
spyOn(this.myObject, 'functionCallToSpy').and.callThrough();
```

You can also have a spy return fake data:

```js
spyOn(this.myObject, 'functionCallToSpy').and.returnValue('my fake data');
```

You can also inspect the calls on a spy:

```js
spyOn(this.myObject, 'functionCallToSpy');
this.myObject.functionCallToSpy(1,2,3);
var firstCall = this.myObject.functionCallToSpy.calls.first();
expect(firstCall.args)toEqual([1,2,3]);
```

The below example builds on our previous example for myComponent.js:

```js
// code under test in myComponent.js
module.exports = MyComponent;
function MyComponent(){
  var self = this;
  this.onInit = function(){
    if (!self.myId) {
      self.myId = '123';
      self.otherFunction(self.myId);
    }
  };
  this.otherFunction = function(myId){
    console.log(myId);
  };
}

// tests for my component in myComponent.spec.js
var MyComponent = require('./myComponent');
describe('my component', function(){
  beforeEach(function(){
    this.component = new MyComponent();
  });
  describe('when on init', function(){
    // setup a spy on 'otherFunction'
    beforeEach(function(){
      spyOn(this.component, 'otherFunction');
    });
    describe('without value for myId', function(){
      beforeEach(function(){
        this.component.myId = undefined;
        this.component.onInit();
      });
      // assert our spy was called with the expected value
      it('should call otherFunction with 123', function(){
        expect(this.component.otherFunction).toHaveBeenCalledWith('123');
      });
    });
    describe('with value for myId', function(){
      beforeEach(function(){
        this.myId = '456';
        this.component.myId = this.myId;
        this.component.onInit();
      });
      // assert our spy was not called
      it('should call otherFunction with myId', function(){
        expect(this.component.otherFunction).not.toHaveBeenCalled();
      });
    });
  });
});
```