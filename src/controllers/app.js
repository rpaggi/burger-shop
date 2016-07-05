var app = angular.module('app', []);
app.controller('ApplicationController', ApplicationController);

function  ApplicationController(){
  var vm = this;
  vm.templateUrl = 'views/home.html' //Default templateUrl
}
