'use strict';

describe('Controller: SiswaDescCtrl', function () {

  // load the controller's module
  beforeEach(module('dataStructureProjectApp'));

  var SiswaDescCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SiswaDescCtrl = $controller('SiswaDescCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SiswaDescCtrl.awesomeThings.length).toBe(3);
  });
});
