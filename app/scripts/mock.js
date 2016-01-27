'use strict';

var nobackend = document.URL.match(/nobackend/);

var LASTNAMES = ['A', 'B', 'C', 'D', 'R', 'S'];

/** Endpoint */
var startMock = function ($httpBackend) {
  // /api/games
  $httpBackend.when('GET', '/api/games').respond(function (method, url) {
    var limitMatches = 5,
        limitDays = 3,
        matches = [],
        days = [],
        dataByMonth,
        day = new Date();

      /**
      * Render matches data
      *
      * times render: limitMatches
      * @return {matches}
      */
    _.each(_.range(limitMatches), function (index) {
      if (index == 3) {
        matches.push({
          id: index + 1,
          "team_1": {
            "point": Faker.random.number(5 + index),
            "members": {"user_name_1": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[0], "user_name_2": ''}
          },
          "team_2": {
            "point": Faker.random.number(5 + index),
            "members": {"user_name_1": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[2], "user_name_2": ''}
          }
        })
      }
      else {
        matches.push({
          id: index + 1,
          "team_1": {
            "point": Faker.random.number(5 + index),
            "members": {"user_name_1": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[0], "user_name_2": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[1]}
          },
          "team_2": {
            "point": Faker.random.number(5 + index),
            "members": {"user_name_1": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[2], "user_name_2": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[3]}
          }
        })
      }
    });

    /**
    * Render matches by days data
    *
    * times render: limitDays
    * @return {matches by days}
    */
    _.each(_.range(limitDays), function (index) {

      days.push({
        "created_at": day.setDate(day.getDate() + index),
        "matches": matches
      })
    });

    // The results send to dislay
    dataByMonth = {
        "month": Faker.Date.recent(limitDays),
        "days": days
      };

    return [200, {results: dataByMonth}, {}];
  });

  /**
  * Get ranking by players/teams
  * API: /api/rank/teams
  * API: /api/rank/players
  */
  var apiRank = /api\/rank\/([a-z]+)/
  $httpBackend.when('GET', apiRank).respond(function (method, url) {
    var indices = apiRank.exec(url),
        rankBy = indices[1],
        limitRank = 20,
        rankData = [];
    /**
    * Render rank by players/teams data
    *
    * times render: limitRank
    * @return {matches by players/teams}
    */
    _.each(_.range(limitRank), function (index) {
      if (rankBy == 'players') {
        rankData.push({
          "id": index + 1,
          "user_name": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[0],
          "point": (index + 1) * 5
        });
      }
      if (rankBy == 'teams') {
        rankData.push({
          "id": index + 1,
          "team": {"user_name_1": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[0], "user_name_2": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[1]},
          "point": (index + 1) * 5
        });
      }
    });

    return [200, {results: rankData}, {}];
  });

  /**
  * Get users
  * API: /api/users
  */
  var apiUsers = /api\/users/
  $httpBackend.when('GET', apiUsers).respond(function (method, url) {
    var limitUsers = 20,
        users = [];
    /**
    * Render users data
    *
    * times render: limitUsers
    * @return
    */
    _.each(_.range(limitUsers), function (index) {
      users.push({
        "id": index + 1,
        "user_name": Faker.Name.firstName() + ' ' + _.shuffle(LASTNAMES)[0],
      });
    });

    return [200, {results: users}, {}];
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
  .run(function($httpBackend, $rootScope) {
    if (nobackend) {
      startMock($httpBackend);
    }
  });
