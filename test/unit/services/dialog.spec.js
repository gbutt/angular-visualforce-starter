describe('dialog', function() {

    beforeEach(function() {
        angular.mock.module('dialog');
        inject(function(dialogService) {
            this.dialogService = dialogService;
        });
    });

    it('should register', function() {
        expect(this.dialogService).toBeDefined();
    });
});