'use strict';

describe('Controller: PelaporansubCtrl', function () {

  // load the controller's module
  beforeEach(module('dataStructureProjectApp'));

  var PelaporansubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PelaporansubCtrl = $controller('PelaporansubCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PelaporansubCtrl.awesomeThings.length).toBe(3);
  });
});
