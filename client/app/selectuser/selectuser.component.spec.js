'use strict';

describe('Component: SelectuserComponent', function() {
  // load the controller's module
  beforeEach(module('yoApp.selectuser'));

  var SelectuserComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SelectuserComponent = $componentController('selectuser', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
