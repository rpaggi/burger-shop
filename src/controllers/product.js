app.controller('ProductController', ['$http',function($http){
  var vm = this;
  vm.name = "teste"
  vm.description = "aaaa 111"
  vm.valueSell = 0.0;

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  vm.add = function(){
    var data = "name="+vm.name+
               "&description="+vm.description+
               "&value_sell="+vm.valueSell.replace(/,/g, '.');

    console.log(data);

    var config = {headers: {'token':app.token}};

    $http.post('http://localhost:3000/products', data, config)
    .then(function(response){
      console.log(response);
    }, function (response){
      console.log("!!!error!!!");
      console.log(JSON.stringify(response.data));
      console.log("response status = " + response.status);
    });
  }
}]);
