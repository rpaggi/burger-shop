var app = angular.module('app', ['ngAnimate', require('angular-input-masks')]);
app.controller('ApplicationController', ApplicationController);
app.token = '5bbb1eggie145e1';

function  ApplicationController(){
  var vm = this;
  vm.templateUrl = 'views/home.html' //Default templateUrl

  //var messageBox = angular.element( document.querySelector( '.message' ) );
  //messageBox.addClass();
}

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
