'use strict';

describe('Controller: MutasiCtrl', function () {

  // load the controller's module
  beforeEach(module('dataStructureProjectApp'));

  var MutasiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MutasiCtrl = $controller('MutasiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MutasiCtrl.awesomeThings.length).toBe(3);
  });
});
