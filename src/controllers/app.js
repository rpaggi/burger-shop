var app = angular.module('app', ['ngAnimate']);
app.controller('ApplicationController', ApplicationController);
app.token = '5bbb1eggie145e1';

function  ApplicationController(){
  var vm = this;
  vm.templateUrl = 'views/home.html' //Default templateUrl

  //var messageBox = angular.element( document.querySelector( '.message' ) );
  //messageBox.addClass();
}
