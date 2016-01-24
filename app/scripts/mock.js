'use strict';

var nobackend = document.URL.match(/nobackend/);

/** Endpoint */
var startMock = function ($httpBackend) {
  $httpBackend.whenGET('/api/games').respond(function () {
    var limitMatches = 5,
        limitDays = 3,
        matches = [],
        days = [],
        dataByMonth,
        lastNames = ['A', 'B', 'C', 'D', 'R', 'S'];

      /**
      * Render matches data
      *
      * times render: limitMatches
      * @return {matches}
      */
    _.each(_.range(limitMatches), function (index) {
      matches.push({
        id: index + 1,
        "team_1": {
          "point": Faker.random.number(5 + index),
          "members": {"user_1": Faker.Name.firstName() + ' ' + _.shuffle(lastNames)[0], "user_2": Faker.Name.firstName() + ' ' + _.shuffle(lastNames)[1]}
        },
        "team_2": {
          "point": Faker.random.number(5 + index),
          "members": {"user_1": Faker.Name.firstName() + ' ' + _.shuffle(lastNames)[2], "user_2": Faker.Name.firstName() + ' ' + _.shuffle(lastNames)[3]}
        }
      })
    });

    /**
    * Render matches by days data
    *
    * times render: limitDays
    * @return {matches by days}
    */
    _.each(_.range(limitDays), function (index) {
      days.push({
        "created_at": Faker.Date.recent(index),
        "matches": matches
      })
    });

    // The results send to dislay
    dataByMonth = {
        "month": Faker.Date.recent(limitDays),
        "days": days
      };

    return [200, {data: dataByMonth}, {}];
  });

  // If GET it is not api it will this passThrough
  $httpBackend.when('GET', /views/).passThrough();

};

angular.module('foosballApp')
  .config(function($provide) {
    if (nobackend) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }
  })
  .run(function($httpBackend) {
    if (nobackend) {
      startMock($httpBackend);
    }
  });
