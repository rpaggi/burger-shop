app.controller('MessageBoxController', ['Scopes', 'Messages', MessageBoxController]);

function MessageBoxController(Scopes, Messages){
  var vm = this;
  Scopes.store('MessageBoxController', vm);

  vm.show = false;
  vm.color = 'red';
  vm.text = 'Mensagem aqui';

  vm.toogle = function(){
    if (vm.show) vm.show = false
    else vm.show = true
  }

  vm.sucess = function(cod){
    vm.text = Messages.get(cod);
    vm.show = true;
    vm.color = 'green';
  }

  vm.error = function(cod){
    vm.text = Messages.get(cod);
    vm.show = true;
    vm.color = 'red';
  }
}
