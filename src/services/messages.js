app.factory('Messages', function ($rootScope) {
    var messages = {
      'PROD0001':'Produto incluso com sucesso!',
      'PROD0002':'Erro ao incluir o produto'
    };

    return {
        get: function (key) {
            return messages[key];
        }
    };
});
