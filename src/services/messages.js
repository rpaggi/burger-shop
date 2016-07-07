app.factory('Messages', function ($rootScope) {
    var messages = {
      'PROD0001':'Produto incluso com sucesso!',
      'PROD0002':'Erro ao incluir o produto',
      'PROD0003':'Erro ao consultar produtos na base de dados',
      'PROD0004':'Produto alterado com sucesso',
      'PROD0005':'Erro ao alterar o produto',
      'PROD0006':'Erro ao deletar o produto'
    };

    return {
        get: function (key) {
            return messages[key];
        }
    };
});
