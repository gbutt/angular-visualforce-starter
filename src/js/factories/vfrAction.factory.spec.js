(function () {
  'use strict';

  describe('VfrAction.factory', function () {

    beforeEach(function () {
      angular.mock.module('app');
      inject(function (vfrActionFactory, $rootScope) {
        this.vfrActionFactory = vfrActionFactory;
        this.$scope = $rootScope.$new();
      });
    });

    it('should initialize', function () {
      expect(this.vfrActionFactory).toBeDefined();
    });

    describe('create vfr action', function () {
      beforeEach(function () {
        this.config = {
          actionName: 'remoteAction',
          options: {}
        };
        this.vfrFn = this.vfrActionFactory.build(this.config);
      });
      it('should generate a function', function () {
        expect(this.vfrFn).toEqual(jasmine.any(Function));
      });
    });

    describe('invoke visualforce action', function () {
      beforeEach(function () {
        this.config = {
          actionName: 'remoteAction',
          options: {}
        };
        this.vfrFn = this.vfrActionFactory.build(this.config);
      });
      beforeEach(function () {
        var vfrManager = jasmine.createSpyObj('Manager', ['invokeAction']);
        Visualforce.remoting.Manager = vfrManager;
        this.promise = this.vfrFn(1, 2, 3);
        this.vfrCall = vfrManager.invokeAction.calls.first();
      });
      it('should pass action with parameters', function () {
        expect(this.vfrCall.args[0]).toBe(this.config.actionName);
        expect(this.vfrCall.args[1]).toBe(1);
        expect(this.vfrCall.args[2]).toBe(2);
        expect(this.vfrCall.args[3]).toBe(3);
      });
      it('should pass callback function', function () {
        expect(this.vfrCall.args[4]).toEqual(jasmine.any(Function));
      });
      it('should pass options', function () {
        expect(this.vfrCall.args[5]).toBe(this.config.options);
      });
      it('should resolve promise on success', function (done) {
        this.vfrCall.args[4]('my result', {
          status: 'success'
        });
        this.promise.then(function (result) {
          expect(result).toBe('my result');
          done();
        });
        this.$scope.$apply();
      });
      it('should reject promise on error', function (done) {
        this.vfrCall.args[4](undefined, {
          message: 'my error'
        });
        this.promise
          .catch(function (error) {
            expect(error).toEqual({
              message: 'my error'
            });
            done();
          });
        this.$scope.$apply();
      });
    });

  });
})();