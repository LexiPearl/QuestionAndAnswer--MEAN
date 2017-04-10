var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/dashboard',{
      templateUrl: '../partials/dashboard.html',
      controller: 'loginController'
    })
    .when('/',{
        templateUrl: '../partials/login.html',
        controller: 'loginController'
    })
    .when('/logout',{
        templateUrl: '../partials/login.html',
        controller: 'loginController'
    })
    .when('/loggedIn',{
        templateUrl: '../partials/dashboard.html',
        controller: 'loginController'
    })
    .when('/newQuestion',{
        templateUrl: '../partials/newQuestion.html',
        controller: 'loginController'
    })
      .when('/question/:id/answer',{
          templateUrl: '../partials/newAnswer.html',
          controller: 'questionController'
      })
      .when('/answer/:id/like',{
          templateUrl: '../partials/questionInfo.html',
          controller: 'questionController'
      })
      .when('/question/:id',{
          templateUrl: '../partials/questionInfo.html',
          controller: 'questionController'
      })
});
