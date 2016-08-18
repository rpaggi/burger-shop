const {ipcRenderer} = require('electron');
ipcRenderer.on('menu', (event, arg) => {
  var scope = angular.element(document.getElementsByTagName('body')).scope();
  var setUrl = function(url){
    scope.$apply(function(){
      scope.Application.templateUrl = url;
    })
  }

  switch (arg) {
    case 'product-add':
      setUrl("views/product/add.html");
      break;
    case 'product-consult':
      setUrl("views/product/consult.html");
      break;
    case 'order-add':
      setUrl("views/orders/add.html");
      break;
    case 'order-consult':
      setUrl("views/orders/consult.html");
      break;
    default:
      setUrl("views/home.html");
      break;
  }
});
