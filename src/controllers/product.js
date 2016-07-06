app.controller('ProductController', ['$http',function($http){
  var vm = this;
  vm.name = ""
  vm.description = ""
  vm.valueSell = 0.0;

  vm.add = function(){
    var data = {name:vm.name, description:vm.description, value_sell:vm.valueSell};
    var config = {headers: {'token':app.token, 'data': data}};

    $http.post('http://localhost:3000/users', config)
    .then(function(response){
      console.log(response);
    }), function(response){
      console.log("error " + response);
    };
  }
}]);
