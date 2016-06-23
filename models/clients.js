var crypto = require('crypto');
var TokenGenerator = getmodule('api_modules/token');

exports.perm = function(req, res, next){
	req.profiles = [1,2,3];
	next();
};

exports.add = function(req, res){
	TokenGenerator.verifiesPermission(req.get("token"), profiles, function(err){
		if(err) return res.status(400).json(err);
	});

	var data = req.body;

	if(data.name == null || data.name == ""){
		return res.status(400).json({err:"Nome inválido"});
	}

	if(data.address == null || data.address == ""){
		return res.status(400).json({err:"Endereço inválido"});
	}

	if(data.number == null || data.number == ""){
		return res.status(400).json({err:"Número inválido"});
	}

	if(data.city == null || data.city == ""){
		return res.status(400).json({err:"Cidade inválida"});
	}

	if(data.state == null || data.state == ""){
		return res.status(400).json({err:"Estado inválido"});
	}

	if(isNaN(data.zipcode) || data.zipcode == 0){
		return res.status(400).json({err:"CEP inválido"});
	}

	if(isNaN(data.phone1) || data.phone1 == 0){
		return res.status(400).json({err:"CEP inválido"});
	}

	var data = req.body;

	req.getConnection(function(err,connection){
		connection.query('INSERT INTO clients SET ?;',[data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.get = function(req, res){
	TokenGenerator.verifiesPermission(req.get("token"), profiles, function(err){
		if(err) return res.status(400).json(err);
	});

	var id = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'SELECT * FROM clients WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.getByPhone = function(req, res){
	TokenGenerator.verifiesPermission(req.get("token"), profiles, function(err){
		if(err) return res.status(400).json(err);
	});

	var phone = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'SELECT * FROM clients WHERE phone1 = ?',
			[phone],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.delete = function(req, res){
	TokenGenerator.verifiesPermission(req.get("token"), profiles, function(err){
		if(err) return res.status(400).json(err);
	});

	var id = req.params.p;
	req.getConnection(function(err, connection){
		connection.query(
			'DELETE FROM clients WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}

exports.update = function(req, res){
	TokenGenerator.verifiesPermission(req.get("token"), profiles, function(err){
		if(err) return res.status(400).json(err);
	});

	var id = req.params.p;
	var data = req.body;

	req.getConnection(function(err, connection){
		connection.query(
			'UPDATE clients SET ? WHERE id = ?',
			[data, id],
			function(err, result){
				if (err) return res.status(400).json(err);

				return res.status(200).json(result);
			}
		)
	});
}
