(function () {
  'use strict';

  describe('userNotification service', function () {
    beforeEach(function () {
      angular.mock.module('app');
      inject(function (userNotificationService, ngToast) {
        this.userNotificationService = userNotificationService;
        this.ngToast = ngToast;
        spyOn(ngToast, 'create');
      });
    });

    it('should initialize', function () {
      expect(this.userNotificationService).toBeDefined();
    });

    it('should create success message', function () {
      this.userNotificationService.success('message');
      expect(this.ngToast.create).toHaveBeenCalledWith('message');
    });

    it('should create error message', function () {
      this.userNotificationService.error('message');
      expect(this.ngToast.create).toHaveBeenCalledWith({
        content: 'message',
        className: 'danger',
        dismissOnTimeout: false
      });
    });

    it('should default error message if none provided', function () {
      this.userNotificationService.error();
      var content = 'An unexpected error occurred';
      expect(this.ngToast.create).toHaveBeenCalledWith({
        content: content,
        className: 'danger',
        dismissOnTimeout: false
      });
    })
  });
})();