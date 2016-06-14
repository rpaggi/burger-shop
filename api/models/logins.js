var crypto = require('crypto');
var TokenGenerator = getmodule('api_modules/token');

var updateToken = function(connection, id, token){
	connection.query(
		'UPDATE logins SET token = ? WHERE id = ?;',
		[token, id],
		function(err,result){
			if(err) return err
		});

	return null;
}

exports.do = function(req, res) {
	var user    = req.body["user"];
	var password = req.body["password"];

	if(user == null){
		return res.status(400).json({"err":"Usuário em branco"});
	}

	if(password == null){
		return res.status(400).json({"err":"Senha em branco"});
	}

	cPassword = crypto.createHash('md5').update(password).digest("hex");

	req.getConnection(function(err,connection){
        connection.query('SELECT * FROM logins WHERE user = ? AND password = ?;',[user, cPassword],function(err,result){
			if(err) return res.status(400).json(err);

			if(Object.keys(result).length > 0){
				var token = TokenGenerator.generate(result[0]['profile']);
				var ret   = updateToken(connection, result[0]['id'], token);

				if(ret != null) return res.status(400).json(ret);
				return res.status(200).json({"token":token});
			}else return res.status(400).json({"err":"Login e senha inválidos"});


        });
    });
}
