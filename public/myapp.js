var app = angular.module('myapp', ['ui.router','ngAnimate']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl as home'
      })
      .state('play', {
        url: '/play',
        templateUrl: 'views/play.html',
        controller: 'playCtrl as play'
      });
}]);

app.factory('Quiz', function(){
  var data =[
      {q:'Jestes gotowy/a ?',a:'tak'},
      {q:'2+2?',a:'4'}
    ];
  return {
    getData: function(){
      return data;
    }
  }
});

