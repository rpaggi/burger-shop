var crypto = require('crypto');
var TokenGenerator = getmodule('api_modules/token');

var profiles = [1,2];

var updateToken = function(connection, id, token){
	connection.query(
		'UPDATE logins SET token = ? WHERE id = ?;',
		[token, id],
		function(err,result){
			if(err) return err
		});

	return null;
}

exports.add = function(req, res){
	if(TokenGenerator.verifiesPermission(req.get("token"), profiles).err) return res.status(400).json(verify);

	var data = req.body;

	if(isNaN(data.id) || data.id == 0){
		return res.status(400).json({err:"Id inválido"});
	}

	if(data.name == null || data.name == ""){
		return res.status(400).json({err:"Nome inválido"});
	}

	var data = req.body;

	req.getConnection(function(err,connection){
		connection.query('INSERT INTO tables SET ?;',[data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.get = function(req, res){
	if(TokenGenerator.verifiesPermission(req.get("token"), profiles).err) return res.status(400).json(verify);

	var id = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'SELECT * FROM tables WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.delete = function(req, res){
	if(TokenGenerator.verifiesPermission(req.get("token"), profiles).err) return res.status(400).json(verify);

	var id = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'DELETE FROM tables WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.update = function(req, res){
	if(TokenGenerator.verifiesPermission(req.get("token"), profiles).err) return res.status(400).json(verify);

	var id = req.params.p;
	var data = req.body;

	req.getConnection(function(err, connection){
		connection.query(
			'UPDATE tables SET ? WHERE id = ?',
			[data, id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}
