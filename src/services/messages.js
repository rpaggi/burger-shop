app.factory('Messages', function ($rootScope) {
    var messages = {
      'PROD0001':'Produto incluso com sucesso!',
      'PROD0002':'Erro ao incluir o produto',
      'PROD0003':'Erro ao consultar produtos na base de dados'
    };

    return {
        get: function (key) {
            return messages[key];
        }
    };
});
