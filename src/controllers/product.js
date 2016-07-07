app.controller('ProductController', ['$http', 'Scopes', function($http, Scopes){
  var vm = this;
  var messageBox  = Scopes.get('MessageBoxController');
  vm.id = Scopes.get('ProductID');
  vm.name = "";
  vm.description = "";
  vm.valueSell = "0,00";
  vm.hincl = "";
  vm.disabled = false;

  vm.products = [];

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var config = {headers: {'token':app.token}};

  function _cleanFields(){
    vm.id = 0
    vm.name = ""
    vm.description = ""
    vm.valueSell = "0,00";
    vm.hincl = ""
  }

  vm.add = function(){
    var data = "name="+vm.name+
               "&description="+vm.description+
               "&value_sell="+vm.valueSell//.replace(/,/g, '.');


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

  vm.preDetail = function(id){
    Scopes.store("ProductID", id);
  }

  vm.loadProduct = function(){
    $http.get('http://localhost:3000/products/'+vm.id, config)
    .then(function(response){
      vm.id = response.data[0].id;
      vm.name = response.data[0].name;
      vm.description = response.data[0].description;
      vm.valueSell = response.data[0].value_sell;
      vm.hincl = response.data[0].hincl;
    }, function (response){
      console.log("!!!error!!!");
      console.log(JSON.stringify(response.data));
      console.log("response status = " + response.status);
      messageBox.error('PROD0003');
    });
  }

  vm.delete = function(setTemplateUrl){
    if(confirm('Você tem certeza?')){
      $http.delete('http://localhost:3000/products/'+vm.id, config)
      .then(function(response){
        setTemplateUrl("views/product/consult.html");
      }, function (response){
        console.log("!!!error!!!");
        console.log(JSON.stringify(response.data));
        console.log("response status = " + response.status);
        messageBox.error('PROD0003');
      });
    }
  }
}]);
