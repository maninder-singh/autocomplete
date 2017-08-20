var uiApp = angular.module("UiApp",['ui.router']);

uiApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/home");

    $stateProvider.state('home',{
        url : '/home',
        templateUrl:'app/partials/home.html',
        controller:'UICtrl'
    })
}]);