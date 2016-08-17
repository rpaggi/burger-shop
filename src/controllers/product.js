app.controller('ProductController', ['$http', 'Scopes', function($http, Scopes){
  var vm = this;
  var messageBox  = Scopes.get('MessageBoxController');
  vm.id = Scopes.get('ProductID');
  vm.name = "";
  vm.description = [];
  vm.descLastId = 0;
  vm.valueSell = "0,00";
  vm.hincl = "";
  vm.disabled = false;

  vm.products = [];
  vm.descrDelete = [];

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var config = {headers: {'token':app.token}};

  function _cleanFields(){
    vm.id = 0
    vm.name = ""
    vm.description = [];
    vm.valueSell = "0,00";
    vm.hincl = ""
    vm.descLastId = 0;
    vm.descrDelete = [];
  }

  vm.add = function(){
    var data = "name="+vm.name+
               "&value_sell="+vm.valueSell//.replace(/,/g, '.');

    $http.post('http://localhost:3000/products', data, config)
    .then(function(response){
      var error = false;
      for(d in vm.description){
        var data = "product_id="+response.data.info.insertId+
                   "&name="+vm.description[d].name;
        $http.post('http://localhost:3000/products-details', data, config)
        .then(function(response){
        }, function(response){
          console.log("!!!error!!!");
          console.log(JSON.stringify(response.data));
          console.log("response status = " + response.status);
          messageBox.error('PROD0002');
          error = true;
        })
      }
      if(!error){
        messageBox.sucess('PROD0001');
        _cleanFields();
      }
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
      vm.products = sortJson(response.data, 'id', true);

      $http.get('http://localhost:3000/products-details', config)
      .then(function(response){
        var productDetails = sortJson(response.data, 'name', true);
        productDetails = sortJson(productDetails, 'product_id', true);
        for(i in vm.products){
          vm.products[i].description = ""

          for(var j=0;j<productDetails.length;j++){
            if(vm.products[i].id == productDetails[j].product_id){
                vm.products[i].description += productDetails[j].name+"  ";
            }
          }
        }
      })
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
      vm.valueSell = response.data[0].value_sell;
      vm.hincl = response.data[0].hincl;

      $http.get('http://localhost:3000/products-details/product/'+vm.id, config)
      .then(function(response){
        vm.descLastId = 0;
        for(i in response.data){
          vm.description.push(angular.copy({id:response.data[i].id, name:response.data[i].name, saved: true}));
        }
      })
    }, function (response){
      console.log("!!!error!!!");
      console.log(JSON.stringify(response.data));
      console.log("response status = " + response.status);
      messageBox.error('PROD0003');
    });
  }

  vm.delete = function(setTemplateUrl){
    if(confirm('Você tem certeza?')){
      $http.delete('http://localhost:3000/products-details/product/'+vm.id, config)
      .then(function(response){
        $http.delete('http://localhost:3000/products/'+vm.id, config)
        .then(function(response){}, function(response){
          console.log("!!!error!!!");
          console.log(JSON.stringify(response.data));
          console.log("response status = " + response.status);
          messageBox.error('PROD0006');
        })
        setTemplateUrl("views/product/consult.html");
      }, function (response){
        console.log("!!!error!!!");
        console.log(JSON.stringify(response.data));
        console.log("response status = " + response.status);
        messageBox.error('PROD0006');
      });
    }
  }

  vm.save = function(setTemplateUrl){
    var data = "name="+vm.name
               "&value_sell="+vm.valueSell//.replace(/,/g, '.');

    if(confirm('Você tem certeza?')){
      $http.put('http://localhost:3000/products/'+vm.id, data, config)
      .then(function(response){
        messageBox.sucess('PROD0004');
        vm.disabled = true;
      }, function (response){
        console.log("!!!error!!!");
        console.log(JSON.stringify(response.data));
        console.log("response status = " + response.status);
        messageBox.error('PROD0005');
      });

      for(i in vm.description){
        var dataD = "name="+vm.description[i].name;
        if(vm.description[i].saved){
          $http.put('http://localhost:3000/products-details/'+vm.description[i].id, dataD, config)
          .then(function(response){
            vm.description[i].saved = true;
          }, function (response){
            console.log("!!!error!!!");
            console.log(JSON.stringify(response.data));
            console.log("response status = " + response.status);
            messageBox.error('PROD0005');
          });
        }else{
          var dataD = "product_id="+vm.id+
                     "&name="+vm.description[i].name;
          $http.post('http://localhost:3000/products-details', dataD, config)
          .then(function(response){
            vm.description[i].saved = true;
          }, function(response){
            console.log("!!!error!!!");
            console.log(JSON.stringify(response.data));
            console.log("response status = " + response.status);
            messageBox.error('PROD0005');
          })
        }
      }

      for(i in vm.descrDelete){
        console.log(vm.descrDelete[i]);
        $http.delete('http://localhost:3000/products-details/'+vm.descrDelete[i].id, config)
        .then(function(response){
        }, function(response){
          console.log("!!!error!!!");
          console.log(JSON.stringify(response.data));
          console.log("response status = " + response.status);
          messageBox.error('PROD0007');
        })
      }

    }
  }

  vm.addDescription = function(){
    vm.description.push(angular.copy({id:vm.descLastId, name:vm.descriptionT, saved:false}));
    vm.descriptionT = "";
    vm.descLastId++;
  }

  vm.removeDescription = function(id){
    for(d in vm.description){
      if(id == vm.description[d].id){
        if(vm.description[d].saved) vm.descrDelete.push(angular.copy(vm.description[d]));
        vm.description.splice(d, 1);
      }
    }
  }
}]);
