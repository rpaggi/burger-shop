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
    default:
      setUrl("views/home.html");
      break;
  }
});
