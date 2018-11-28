'use strict';

describe('Controller: SiswaDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('dataStructureProjectApp'));

  var SiswaDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SiswaDetailCtrl = $controller('SiswaDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SiswaDetailCtrl.awesomeThings.length).toBe(3);
  });
});
