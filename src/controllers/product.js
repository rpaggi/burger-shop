app.controller('ProductController', ['$http', 'Scopes', function($http, Scopes){
  var vm = this;
  var messageBox  = Scopes.get('MessageBoxController');
  vm.name = ""
  vm.description = ""
  vm.valueSell = "0,00";

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var config = {headers: {'token':app.token}};

  function _cleanFields(){
    vm.name = ""
    vm.description = ""
    vm.valueSell = "0,00";
  }

  vm.add = function(){
    var data = "name="+vm.name+
               "&description="+vm.description+
               "&value_sell="+vm.valueSell.replace(/,/g, '.');

    $http.post('http://localhost:3000/products', data, config)
    .then(function(response){
      console.log(response);
      messageBox.sucess('PROD0001');
      _cleanFields();
    }, function (response){
      console.log("!!!error!!!");
      console.log(JSON.stringify(response.data));
      console.log("response status = " + response.status);
      messageBox.error('PROD0002');
    });
  }

  vm.products = [];
  
  vm.getAll = function(){
    $http.get('http://localhost:3000/products', config)
    .then(function(response){
      vm.products = sortJson(response.data, 'name', true);
    }, function (response){
      console.log("!!!error!!!");
      console.log(JSON.stringify(response.data));
      console.log("response status = " + response.status);
      messageBox.error('PROD0003');
    });
  }
}]);
