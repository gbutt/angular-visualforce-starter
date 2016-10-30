(function () {
  'use strict';

  describe('app component', function () {
    beforeEach(function () {
      angular.mock.module('app');
      inject(function ($componentController, $rootScope, $state, navbarService) {
        this.$componentController = $componentController;
        this.$scope = $rootScope.$new();
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.navbarService = navbarService;
      });
    });
    beforeEach(function () {
      this.component = this.$componentController('appRoot', null, {});
    });

    describe('on init', function () {
      beforeEach(function () {
        spyOn(this.navbarService, 'getTopNavs').and.returnValue([{
          id: '1',
          topNav: true
        }]);
        spyOn(this.component, 'updateViewTitle');
        this.component.$onInit();
      });
      it('should default nav collapsed to true', function () {
        expect(this.component.navCollapsed).toBe(true);
      });
      it('should populate top navs from navbarService', function () {
        expect(this.component.topNavs).toEqual([{
          id: '1',
          topNav: true
        }]);
      });
      it('should update view title', function () {
        expect(this.component.updateViewTitle).toHaveBeenCalled();
      });
    });

    describe('on state change success', function () {
      beforeEach(function () {
        spyOn(this.component, 'updateViewTitle');
        this.$rootScope.$broadcast('$stateChangeSuccess');
      });
      it('should update view title', function () {
        expect(this.component.updateViewTitle).toHaveBeenCalled();
      });
    });


    describe('toggle navigation', function () {
      describe('without value', function () {
        beforeEach(function () {
          this.priorValue = this.component.navCollapsed;
          this.component.toggleNavigation();
        });
        it('should toggle nav collapsed', function () {
          expect(this.component.navCollapsed).toBe(!this.priorValue);
        });
      });
      describe('with value', function () {
        it('should set navCollapsed to passed value', function () {
          this.component.navCollapsed = true;
          this.component.toggleNavigation(true);
          expect(this.component.navCollapsed).toBe(true);
          this.component.navCollapsed = false;
          this.component.toggleNavigation(false);
          expect(this.component.navCollapsed).toBe(false);
        });
      });
    });

    describe('update view title', function () {
      describe('with current state title', function () {
        beforeEach(function () {
          this.expectedValue = 'State Title';
          this.$state.current = {
            title: this.expectedValue
          };
          this.component.updateViewTitle();
        });
        it('should set view title to current state title', function () {
          expect(this.component.viewTitle).toBe(this.expectedValue);
        });
      });
      describe('without current state title', function () {
        beforeEach(function () {
          this.expectedValue = 'Prior State Title';
          this.$state.current = {};
          this.component.viewTitle = this.expectedValue;
          this.component.updateViewTitle();
        });
        it('should set view title to current state title', function () {
          expect(this.component.viewTitle).toBe(this.expectedValue);
        });
      });
    });

    describe('is active', function () {
      beforeEach(function () {
        this.component.viewTitle = 'My Cases';
      });
      it('should be active when viewtitle matches input', function () {
        expect(this.component.isActive(this.component.viewTitle)).toBe(true);
      });
      it('should not be active when viewtitle does not match input', function () {
        expect(this.component.isActive(this.component.viewTitle + 'no match')).toBe(false);
      });
    });

  });
})();