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

exports.perm = function(req, res, next){
	req.profiles = [1];
	next();
};

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

exports.add = function(req, res){
	if(req.body.user == null || req.body.user == ""){
		return res.status(400).json({err:"Usuário inválido"});
	}

	if(req.body.password == null || req.body.password == ""){
		return res.status(400).json({err:"Senha inválido"});
	}

	if(req.body.name == null || req.body.name == ""){
		return res.status(400).json({err:"Nome inválido"});
	}

	if(isNaN(req.body.profile) || req.body.profile == 0){
		return res.status(400).json({err:"Perfil inválido"});
	}

	var data = req.body;
	data.password = crypto.createHash('md5').update(data.password).digest("hex");

	req.getConnection(function(err,connection){
		connection.query('INSERT INTO logins SET ?;',[data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.get = function(req, res){
	var id = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'SELECT * FROM logins WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.getByUser = function(req, res){
	var user = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'SELECT * FROM logins WHERE user = ?',
			[user],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.delete = function(req, res){
	var id = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'DELETE FROM logins WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.update = function(req, res){

	var id = req.params.p;
	var data = req.body;

	if(data.password) data.password = crypto.createHash('md5').update(data.password).digest("hex");

	req.getConnection(function(err, connection){
		connection.query(
			'UPDATE logins SET ? WHERE id = ?',
			[data, id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}
