exports.perm = function(req, res, next){
	req.profiles = [1,2,3,4];
	next();
};

exports.add = function(req, res){
	var data = req.body;

	if(isNaN(data.id) || data.id == 0){
		return res.status(400).json({err:"Id inválido"});
	}

	if(data.name == null || data.name == ""){
		return res.status(400).json({err:"Nome inválido"});
	}

	var data = req.body;

	req.getConnection(function(err,connection){
		if(err) return res.status(400).json(err);

		connection.query('INSERT INTO tables SET ?;',[data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.get = function(req, res){
	var id = req.params.p;
	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(err);

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
	var id = req.params.p;
	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(err);

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
	var id = req.params.p;
	var data = req.body;

	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(err);

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
