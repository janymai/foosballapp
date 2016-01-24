'use strict';

describe('Service: Rank', function () {

  // load the service's module
  beforeEach(module('FoosballApp'));

  // instantiate service
  var Rank;
  beforeEach(inject(function (_Rank_) {
    Rank = _Rank_;
  }));

  it('should do something', function () {
    expect(!!Rank).toBe(true);
  });

});
