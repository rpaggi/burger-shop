var crypto = require('crypto');

var TokenGenerator = require( 'token-generator' )({
        salt: 'bacon is life',
        timestampMap: 'a1c2e3g4i5', // 10 chars array for obfuscation proposes 
    });

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
	var login    = req.body["login"];
	var password = req.body["password"];

	if(login == null){
		return res.status(400).json({"err":"Login em branco"});
	}

	if(password == null){
		return res.status(400).json({"err":"Senha em branco"});
	}

	cPassword = crypto.createHash('md5').update(password).digest("hex");

	req.getConnection(function(err,connection){
        connection.query('SELECT * FROM logins WHERE user = ? AND password = ?;',[login, cPassword],function(err,result){
			if(err) return res.status(400).json(err);

			if(Object.keys(result).length > 0){
				var token = TokenGenerator.generate();
				var ret   = updateToken(connection, result[0]['id'], token);

				if(ret != null) return res.status(400).json(ret);
				return res.status(200).json({"token":token});
			}else return res.status(400).json({"err":"Login e senha inválidos"});
				
			
        });
    });
}