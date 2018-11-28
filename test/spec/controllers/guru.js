'use strict';

describe('Controller: GuruCtrl', function () {

  // load the controller's module
  beforeEach(module('dataStructureProjectApp'));

  var GuruCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuruCtrl = $controller('GuruCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GuruCtrl.awesomeThings.length).toBe(3);
  });
});
