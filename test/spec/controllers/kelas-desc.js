'use strict';

describe('Controller: KelasDescCtrl', function () {

  // load the controller's module
  beforeEach(module('dataStructureProjectApp'));

  var KelasDescCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KelasDescCtrl = $controller('KelasDescCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KelasDescCtrl.awesomeThings.length).toBe(3);
  });
});
